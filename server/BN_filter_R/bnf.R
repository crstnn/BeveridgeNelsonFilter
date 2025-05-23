
#' Transform Series
#' @description
#' Returns a suitably transformed, lagged and/or differenced data.
#' Inspired by the GAUSS procs originally written by [Mark Watson](http://www.princeton.edu/~mwatson/wp.html).
#' @param y numeric vector, input time series, eg class ts
#' @param take_log logical, take the natural logarithm? Default is no (FALSE)
#' @param dcode character option to specify how y is differenced:
#'  - "nd", No difference, i.e., level, default
#'  - "d1", 1st Difference, i.e., (1 - B)y
#'  - "d4", 4th Difference, i.e., (1 - B^4)y, use with quarterly data
#'  - "d12", 12th Difference, i.e., (1 - B^12)y, use with monthly data
#' @param pcode character, option to specify if percentages are computed:
#'  - "np", no change, default
#'  - "p1", multiply by 100
#'  - "p4", multiply by 400, eg. for annualized quarterly rate
#'  - "p12", multiply by 1200, eg. for annualized monthly rate
#' @returns A vector transformed, if class x is class ts, class ts
#' @export
#'
#' @examples
#' data(usdata)
#' head(transform_series(usdata$GDPC1, TRUE, "d4", "p4"))
transform_series <- function(y,
                             take_log = FALSE,
                             dcode = c("nd", "d1", "d4", "d12"),
                             pcode = c("np", "p1", "p4", "p12")) {
    # Save 'ts' attributes if 'y' is a 'ts' object
    if (is.ts(y)) {
        y_ts <- TRUE
        endy <- end(y)
        freqy <- frequency(y)
    } else {
        y_ts <- FALSE
    }

    # Preliminary stuff
    ty <- as.matrix(y)

    # Log transformation
    if (take_log) {
        if (any(ty < 0, na.rm = TRUE)) {
            ty[which(ty < 0)] <- NaN
        }
        ty <- log(as.matrix(ty))
    }

    # Difference transform if requested
    dcode <- match.arg(dcode)

    switch (
        EXPR = dcode,
        "nd" = {
            ty
        },
        # do nothing
        "d1" = {
            ty <- diff(x = ty, lag = 1)
        },
        "d4" = {
            ty <- diff(x = ty, lag = 4)
        },
        "d12" = {
            ty <- diff(x = ty, lag = 12)
        }
    )

    # Convert to percentage if requested
    pcode <- match.arg(pcode)

    switch (
        EXPR = pcode,
        "np" = {
            ty
        },
        # do nothing
        "p1" = {
            ty <- ty * 100.0
        },
        "p4" = {
            ty <- ty * 400.0
        },
        "p12" = {
            ty <- ty * 1200.0
        }
    )

    # Add 'ts' attribute to 'ty' if is a 'ts' object
    if (y_ts) {
        ty <- ts(ty, end = endy, frequency = freqy)
    }

    return (ty) }

#' Piecewise Demean
#' @description Demean relative to the break point(s) provided in 'breaks'.
#' The values in 'breaks' are assumed to be in ascending order.
#' @param y Numeric vector, a time series, eg of class ts
#' @param breaks Numeric vector, break points in observation indices, default `c()`
#' includes no breaks, then full sample mean is used instead
#' @returns Numeric vector, of length(y)
#' @export
#' @examples
#' data(usdata)
#' head(piecewise_demean(usdata$GDPC1, breaks=c(100,200)))
piecewise_demean <- function(y, breaks = c()) {
    # Preliminary stuff
    y <- as.matrix(y)
    tobs <- nrow(y)

    # Allocate storage for the demeaned series
    demeaned_y <- matrix(data = NA_real_,
                         nrow = tobs,
                         ncol = 1)
    br <- c(0, breaks, tobs)
    nb <- length(breaks)

    # Number of break points 'nb' should not be greater than T-1
    if (nb > (tobs - 1)) {
        stop(sprintf(
            "Number of break points \'%d\' not feasible with T - 1 = %d\n",
            nb,
            tobs - 1
        ))
    }

    # Last break point should not be greater than number of observations 'T'
    if (max(breaks) > tobs) {
        stop(
            sprintf(
                "Largest break point \'%d\' greater than time series length \'%d\'\n",
                breaks[nb],
                tobs
            )
        )
    }

    for (i in  1:(nb + 1)) {
        j <- br[i] + 1
        k <- br[i + 1]
        demeaned_y[j:k] <-
            scale(x = y[j:k],
                  center = TRUE,
                  scale = FALSE)
    }

    return (demeaned_y)
}

#' Rolling Demean
#' @description
#' Demean time series relative to a backward rolling window 'wind'
#' @param y Numeric vector, a time series, eg of class ts
#' @param y_cycle Numeric vector, a time series of cycle, must be length of y, can be zeros
#' @param wind Integer, rolling window width
#' @returns Numeric vector
#' @noRd
rolling_demean <- function(y, y_cycle, wind) {
    # Preliminary stuff
    y <- as.matrix(y)
    y_cycle <- as.matrix(y_cycle)
    tobs <- nrow(y)
    windp1 <- wind + 1
    windm1 <- wind - 1

    if (wind > tobs) {
        stop(sprintf(
            "Window length \'%d\' greater than time series length \'%d\'\n",
            wind,
            tobs
        ))
    }

    # Allocate storage for the demeaned series
    demeaned_y <- matrix(data = NA_real_,
                         nrow = tobs,
                         ncol = 1)

    demeaned_y[1:wind] <-
        as.matrix(y[1:wind]) - mean(y[1:wind]) + mean(y_cycle[1:wind])

    for (i in windp1:tobs) {
        demeaned_y[i] <-
            y[i] - mean(y[(i - windm1):i]) + mean(y_cycle[(i - windm1):i])
    }

    return (demeaned_y)
}

#' Beveridge-Nelson Filter
#' @description Based on Replication Files for Kamber, Morley & Wong
#' R conversion of some of the MATLAB codes originally written by Ben Wong
#' @param y vector, eg object of type `ts`
#' @param delta_select integer, set to 0 if use fixed delta, 1 if max amp-to-noise, 2 if min var(trend shocks)
#' @param fixed_delta integer, set a fixed delta to be used if delta_select=0, or for delta
#' @param p integer, is lag order for estimation
#' @param d0 integer, min_delta: start point of grid search for delta if delta_select!=0
#' @param dt integer, delta increment
#' @param demean character, one of "nd", "sm", "dm", or "pm", where "nd" = no drift, "sm" = sample mean,
#' "dm" = dynamic demeaning, "pm" = structural breaks, set as 'breaks = c(100, 237)'
#' @param iterative integer, set to >1 for max number of iterations for iterative dynamic demeaning
#' @param dynamic_bands logical, set to TRUE for dynamic error bands, FALSE for fixed standard error bands
#' @param adjusted_bands logical, set to TRUE to adjusts for outlier observations when calculating error bands,
#' @param outliers set outliers as 'outliers = c(293, 294)'
#' @param window rolling window length for dynamic demeaning and/or dynamic error bands
#' (e.g., 40 is 10 years for quarterly data)
#' @param ib logical, set to FALSE if no iterative backcasting as in KMW2018 (just unconditional mean),
#' set to TRUE if iterative backcasting
#' @param ... passed into error bands and piecewise_demean function
#' @references
#'  - Kamber G, Morley J, Wong B (2018). “Intuitive and Reliable Estimates of the Output
#'  Gap from a Beveridge-Nelson Filter.” The Review of Economics and Statistics, 100(3),
#'  550-566. ISSN 0034-6535,.
#'  - Kamber G, Morley J, Wong B (2025). “Trend-cycle decomposition in the presence of
#'  large shocks.” Journal of Economic Dynamics and Control, 173, 105066. ISSN 0165-1889.
#' @returns List of class "bnfClass" containing:
#'  - call
#'  - y
#'  - cycle
#'  - trend
#'  - cycle_se: standard error
#'  - delta
#'  - demean_method
#'  - iterative
#'  - cycle_ci
#'  - cycle_adjusted_se
#'  - cycle_ci_adjusted
#'  - iterations
#' @export
#' @examples
#' data(usdata)
#' y <- transform_series(y = usdata$GDPC1, take_log = TRUE, pcode = "p1")
#' bnfOutput <- bnf(as.vector(y),
#'         delta_select = 2,
#'         demean = "dm",
#'         iterative = 100,
#'         dynamic_bands = TRUE,
#'         adjusted_bands = TRUE,
#'         outliers = c(293, 294),
#'         window = 40,
#'         ib = TRUE)
bnf <- function(y,
                delta_select = 2,
                fixed_delta = 0.01,
                p = 12,
                d0 = 0.01,
                dt = 0.0005,
                demean = c("nd", "sm", "pm", "dm"),
                iterative = 100,
                dynamic_bands = TRUE,
                adjusted_bands = FALSE,
                outliers = c(293, 294),
                window = 40,
                ib = TRUE,
                ...) {
    # Demean dy
    demean <- match.arg(demean)
    if (demean != 'dm' && iterative != 0) {
        warning("Setting @iterative to 0 where @demean is not 'dm'.")
        iterative <- 0
        }

    # Save 'ts' attributes if 'y' is a 'ts' object
    if (is.ts(y)) {
        y_ts <- TRUE
        endy <- end(y)
        freqy <- frequency(y)
    } else {
        y_ts <- FALSE
    }

    # Do a few preliminary things
    y <- as.matrix(y)

    # Compute the first-difference and then demean y
    dy <- diff(x = y, lag = 1)

    if (demean == "sm") {
        demeaned_dy <- scale(x = dy,
                             center = TRUE,
                             scale = FALSE)
        demean_method <- "Sample mean"
    } else if (demean == "pm") {
        demeaned_dy <- piecewise_demean(y = dy, ...)
        demean_method <- "Piecewise mean"
    } else if (demean == "dm") {
        demeaned_dy <-
            rolling_demean(y = dy,
                           y_cycle = zeros(nrow(dy), 1),
                           wind = window)
        demean_method <- "Rolling mean"
    } else {
        # demean == "nd"
        demeaned_dy <- dy
        demean_method <- "No drift"
    }


    # Automatically compute delta to pass to BN_Filter
    if (delta_select > 0) {
        delta <- select_delta(demeaned_dy, p, ib, delta_select, d0, dt)
    }
    else {
        delta <- fixed_delta
    }

    bnf_result <-
        BN_Filter(demeaned_dy,
                  p,
                  delta,
                  ib)

    cycle <- bnf_result$BN_cycle

    DeltaBNcycle <- diff(x = cycle, lag = 1)

    is_idm <- iterative > 0 && demean == "dm"
    if (is_idm) {
        cycle_iter <- cbind(zeros(nrow(cycle), 1), cycle)
        iter <- 1

        while (iter < iterative &&
               sd(cycle_iter[, ncol(cycle_iter)] - cycle_iter[, ncol(cycle_iter) - 1]) >
               0.001 * sd(demeaned_dy)) {
            demeaned_dy <-
                rolling_demean(y = dy,
                               y_cycle = DeltaBNcycle,
                               wind = window)

            if (delta_select > 0) {
                delta <- select_delta(demeaned_dy, p, ib, delta_select, d0, dt)
            }
            else{
                delta <- fixed_delta
            }

            bnf_result <-
                BN_Filter(demeaned_dy,
                          p,
                          delta,
                          ib)

            cycle <- bnf_result$BN_cycle
            DeltaBNcycle <- diff(x = cycle, lag = 1)

            cycle_iter <- cbind(cycle_iter, cycle)

            iter <- iter + 1
        }

    }

    bnf_result <- BN_Filter_stderr(demeaned_dy,
                                   p,
                                   dynamic_bands,
                                   ib,
                                   window,
                                   outliers,
                                   adjusted_bands,
                                   bnf_result)

    colnames(cycle) <- "Cycle"

    # Add 'ts' attribute to 'y' and 'cycle' if 'ts' object was originally passed in
    if (y_ts) {
        y <- ts(data = y,
                end = endy,
                frequency = freqy)
        cycle <- ts(data = cycle,
                    end = endy,
                    frequency = freqy)
    }

    # Return result invisibly
    result <- list()
    result$call <- match.call()
    result$y <- y
    result$cycle <- cycle
    result$trend <- y - cycle
    result$cycle_se <- bnf_result$BN_cycle_se
    result$delta <- delta
    result$demean_method <- demean_method
    result$iterative <- iterative
    result$cycle_ci <-
        round(qnorm(p = 0.05 / 2.0, lower.tail = FALSE), 2) * bnf_result$BN_cycle_se
    if (adjusted_bands) {
        result$cycle_adjusted_se <- bnf_result$BN_cycle_adjusted_se
        result$cycle_ci_adjusted <-
            round(qnorm(p = 0.05 / 2.0, lower.tail = FALSE), 2) * bnf_result$BN_cycle_adjusted_se
    }
    if (iterative > 0) {
        result$iterations <- ncol(cycle_iter) - 1
    }
    class(result) <- "bnfClass"
    invisible (result)
}


#' Print
#' @description Print method for class "bnfClass"
#' @param x object of class bnfClass output of [bnf]
#' @param digits integer, significant digits in print, default `getOption("digits") - 3`
#' @param ... further arguments, not used
#' @returns Nothing
#' @export
#'
#' @examples
#' data(usdata)
#' y <- transform_series(y = usdata$GDPC1, take_log = TRUE, pcode = "p1")
#' bnfOutput <- bnf(as.vector(y),
#'         delta_select = 2,
#'         demean = "dm",
#'         iterative = 100,
#'         dynamic_bands = TRUE,
#'         adjusted_bands = TRUE,
#'         outliers = c(293, 294),
#'         window = 40,
#'         ib = TRUE)
#' print(bnfOutput)
print.bnfClass <- function(x,
                           digits = max(3L, getOption("digits") - 3L),
                           ...) {
    cat("\nCall: ",
        paste(deparse(x$call), sep = "\n", collapse = "\n"),
        "\n",
        sep = "")
    cat("\n\tIntuitive and Reliable Estimates of the Output Gap from a Beveridge-Nelson Filter\n")
    cat(sprintf("\nAutomatic Delta: %2.4f\n", x$delta))
    cat(sprintf("\nDemean method: %s\n", x$demean_method))
    if (x$iterative > 0) {
        cat(sprintf("\nIterations: %s\n", x$iterations))
    }
    cat("\nCycle:\n")
    print(x$cycle)
    }


#' Plot
#' @description Plot method for object of class "bnf"
#' @param x object of class "bnfClass" output of [bnf]
#' @param main character, plot title
#' @param plot_ci logical, include cycle confidence interval
#' @param col character, primary color or hexcode
#' @param secondary_col character, secondary color or hexcode
#' @param lwd numeric, line width
#' @param ... other arguments, not used
#'
#' @returns A plot
#' @export
#'
#' @examples
#' data(usdata)
#' y <- transform_series(y = usdata$GDPC1, take_log = TRUE, pcode = "p1")
#' bnfOutput <- bnf(as.vector(y),
#'         delta_select = 2,
#'         demean = "dm",
#'         iterative = 100,
#'         dynamic_bands = TRUE,
#'         adjusted_bands = TRUE,
#'         outliers = c(293, 294),
#'         window = 40,
#'         ib = TRUE)
#' plot(bnfOutput, main="US Output Gap")
plot.bnfClass <- function(x,
                          main = "BN Filter Cycle",
                          plot_ci = TRUE,
                          col = "red",
                          secondary_col = "blue",
                          lwd = 2,
                          ...) {
    # All par settings which could be changed
    oldpar <- par(no.readonly = TRUE)

    # Reset plotting device to original settings on exiting
    on.exit(par(oldpar))

    # Set up new plotting device
    newpar <- par(
        mar = c(0, 0, 0, 0),
        oma = c(4, 4, 3, 2) + 0.1,
        lty = 1,
        lwd = 1,
        xaxs = 'r',
        yaxs = 'r',
        mgp = c(3, 1, 0),
        bty = 'o',
        tcl = -0.5,
        cex.main = 1.2,
        font.main = 2,
        cex.lab = 1.1,
        font.lab = 1,
        cex.axis = 1.1,
        font.axis = 1
    )

    # Establish the panel layout -- 2 x 1
    layout(matrix(
        data = c(1, 2),
        nrow = 1,
        ncol = 1
    ))



    # Preliminary values - cycle
    if (is.ts(x$cycle)) {
        st <- start(x$cycle)[1] + (start(x$cycle)[2] / 12.0)
        et <- end(x$cycle)[1] + (end(x$cycle)[2] / 12.0)
        #x_axis <- seq(from = st + 0.5, to = et + 0.5, length.out = length(x$cycle))
        x_axis <-
            seq(
                from = st + 1 / 12.0,
                to = et + 1 / 12.0,
                length.out = length(x$cycle)
            )
    } else {
        x_axis <- seq(from = 1,
                      to = length(x$cycle),
                      by = 1)
    }

    c_ub <- ceiling(ifelse(plot_ci, ceiling(max(x$cycle) + x$cycle_ci), max(x$cycle)))
    c_lb <- floor(ifelse(plot_ci, floor(min(x$cycle) - x$cycle_ci), min(x$cycle)))

    # Establish the cycle plotting region
    plot(
        x$cycle,
        type = 'n',
        col = NA,
        ylim = c(c_lb, c_ub),
        yaxt = 'n',
        xaxt = 'n',
        main = "",
        ylab = "",
        xlab = ""
    )
    abline(
        h = 0,
        col = 1,
        lwd = 1,
        lty = 1
    )
    lines(x$cycle, col = col, lwd = lwd)

    # 95% Confidence Intervals (if requested)
    if (plot_ci) {
        polygon(
            x = c(x_axis, rev(x_axis)),
            y = c((x$cycle - x$cycle_ci), rev(x$cycle + x$cycle_ci)),
            col = adjustcolor(col, alpha.f = 0.2),
            border = NA
        )

        if ("cycle_ci_adjusted" %in% names(x)) {
            polygon(
                x = c(x_axis, rev(x_axis)),
                y = c((x$cycle - x$cycle_ci_adjusted),
                      rev(x$cycle + x$cycle_ci_adjusted)
                ),
                col = adjustcolor(secondary_col, alpha.f = 0.1),
                border = NA
            )
        }

    }

    # Mark the LHS y-axis
    axis(side = 2, las = 1)

    # Mark the x-axis with dates if available
    if (is.ts(x$cycle)) {
        times <- time(x$cycle)
        ticks <-
            floor(seq(
                from = times[1],
                to = times[length(times)],
                by = ceiling(length(times) / (10 * frequency(x$cycle)))
            ))
        axis(side = 1, at = ticks)
    } else {
        axis(side = 1)
    }

    # Individual title for the sub-panel
    mtext(
        text = "Cycle",
        side = 3,
        line = -1.5,
        outer = FALSE,
        las = 1,
        cex = 1.1,
        font = 2
    )
    box(which = "plot", col = 1)

    # Main title
    mtext(
        text = main,
        side = 3,
        line = 1,
        outer = TRUE,
        las = 1,
        cex = 1.5,
        font = 2
    )

}

#' As Data Frame
#' @description Convert list object output to a data frame
#' @param x Object of class `bnfClass`, output of function [bnf]
#' @returns A data frame including:
#'  - time, where input y to function [bnf] is of class `ts`
#'  - y
#'  - trend
#'  - cycle
#'  - cycle_se
#'  - cycle_ci
#'
#' If adjusted standard errors are applied
#'  - cycle_adjusted_se
#'  - cycle_ci_adjusted
#' @export
as.data.frame.bnfClass <- function(x) {
    stopifnot(inherits(x, "bnfClass"))
    as_date <- function(ts) {
        ti <- time(ts)
        as.Date(paste(ti %/% 1, round((ti %% 1)*12+1), 1, sep="-"), "%Y-%m-%d")
    }
    xn <- c("y", "trend", "cycle", "cycle_se", "cycle_ci")
    if ("cycle_ci_adjusted" %in% names(x)) {
        xn <- c(xn, "cycle_adjusted_se", "cycle_ci_adjusted") }
    df <- data.frame(lapply(setNames(xn, xn), \(xi) as.vector(x[[xi]])))
    if (inherits(x$y, "ts")) {
        df <- data.frame(time=as_date(x$y), df) }
    return(df)
    }
