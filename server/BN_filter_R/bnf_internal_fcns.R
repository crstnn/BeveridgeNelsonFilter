####################################################################################################
# Replication Files for Kamber, Morley & Wong:
#
# "Intuitive and Reliable Estimates of the Output Gap from a Beveridge-Nelson Filter"
# The Review of Economics and Statistics
#
# R conversion of some of the MATLAB codes originally written by Ben Wong
#
####################################################################################################
# MATLAB codes converted to R by Luke Hartigan, 2017
# Additional R codes and wrapper class 'bnf' written by Luke Hartigan, 2017
# Updated by James Morley, 2022
# Additional code changes by Cristian, 2022/2023/2024/2025
####################################################################################################

# Helper functions used by the main functions below

# R emulation of MATLAB eye(N)
eye <- function(n)
{
  return (diag(x = 1, nrow = n))
}

# R emulation of MATLAB ones(M, N)
ones <- function(m, n)
{
  return (matrix(
    data = 1,
    nrow = m,
    ncol = n
  ))
}

# R emulation of MATLAB zeros(M, N)
zeros <- function(m, n)
{
  return (matrix(
    data = 0,
    nrow = m,
    ncol = n
  ))
}

# R emulation of MATLAB repmat(A, M, N)
repmat <- function(mat, m, n)
{
  return (kronecker(matrix(
    data = 1,
    nrow = m,
    ncol = n
  ), mat))
}

# Compute the square of the variable 'x'
square <- function(x)
{
  return (x * x)
}


# Estimate an OLS reduced form VAR
# INPUTS:
# y      Data(T x N)
# p      lags
# nc     put TRUE if you don't want a constant (default is FALSE)
#
# OUTPUTS:
# A      VAR Coefficients
# SIGMA  Reduced form variance covariance matrix
# U      Time Series of Residuals
# invXX  Inverse of the symmetric square matrix X'X
# X      Design matrix
olsvar <- function(y, p, nc = FALSE)
{
  # Preliminary stuff
  y <- as.matrix(y)
  tobs <-
    nrow(y) - p                         # length of time series
  Y <-
    y[(p + 1):nrow(y), , drop = FALSE]     # cut away first p lags

  if (!nc) {
    X <- rep(1, tobs)
  } else {
    X <- c()

  }

  for (i in 1:p) {
    Z <- y[((p + 1) - i):(nrow(y) - i), , drop = FALSE]
    X <- cbind(X, Z)
  }

  # Do the QR decomposition
  qr_xmat <- qr(X)

  # Get the OLS coefficients
  A <- qr.coef(qr = qr_xmat, y = Y)

  # Get the OLS residuals
  U <- qr.resid(qr = qr_xmat, y = Y)

  # Get the OLS VCov matrix
  # df is total sample-lags-number of regressors
  SIGMA <- sum(square(U)) / (tobs - nrow(A))

  invXX <- qr.solve(crossprod(x = X, y = NULL), tol = 1e-30)

  # Collect results as a list object
  olsvar <- list()
  olsvar$A <- A
  olsvar$SIGMA <- SIGMA
  olsvar$U <- U
  olsvar$invXX <- invXX
  olsvar$X <- X

  return (olsvar)
}

# Estimate an AR or VAR in Dickey-Fuller form without a constant
#
# INPUTS:
# y      Data(T x N)
# p      lags
# nc     put TRUE if you don't want a constant (default is FALSE)
#
# OUTPUTS:
# A      VAR Coefficients
# SIGMA  Reduced form variance covariance matrix
# U      Time Series of Residuals
# invXX  Inverse of the symmetric square matrix X'X
# X      Design matrix
olsvar_df <- function(y, p, nc = FALSE)
{
  # Preliminary stuff
  y <- as.matrix(y)
  tobs <-
    nrow(y) - p                         # length of time series
  Y <-
    y[(p + 1):nrow(y), , drop = FALSE]     # cut away first p lags

  if (!nc) {
    X <- rep(1, tobs)

  } else {
    X <- c()

  }

  # Put in first lag on LHS
  Z <- y[p:(nrow(y) - 1), , drop = FALSE]
  X <- cbind(X, Z)
  Y <- Y[2:nrow(Y), , drop = FALSE]
  X <- X[2:nrow(X), , drop = FALSE]

  # Now do second differences
  dy <- diff(y)
  for (i in 1:(p - 1)) {
    Z <- dy[((p + 1) - i):(nrow(dy) - i), , drop = FALSE]
    X <- cbind(X, Z)
  }

  # Do the QR decomposition
  qr_xmat <- qr(X)

  # Get the OLS coefficients
  A <- qr.coef(qr = qr_xmat, y = Y)

  # Get the OLS residuals
  U <- qr.resid(qr = qr_xmat, y = Y)

  # Get the OLS VCov matrix
  # df is total sample-lags-number of regressors
  SIGMA <- sum(square(U)) / (tobs - nrow(A))


  invXX <- qr.solve(crossprod(x = X, y = NULL), tol = 1e-30)

  # Collect results as a list object
  olsvar_df <- list()
  olsvar_df$A <- A
  olsvar_df$SIGMA <- SIGMA
  olsvar_df$U <- U
  olsvar_df$invXX <- invXX
  olsvar_df$X <- X

  return (olsvar_df)

}

# Estimate an OLS reduced form VAR and adjust estimated variance of errors for outliers
# INPUTS:
# y      Data(T x N)
# p      lags
# temp_outliers	dates of outliers
# nc     put TRUE if you don't want a constant (default is FALSE)
#
# OUTPUTS:
# A      VAR Coefficients
# SIGMA  Reduced form variance covariance matrix
# U      Time Series of Residuals
# invXX  Inverse of the symmetric square matrix X'X
# X      Design matrix
olsvar_outliers <- function(y, p, temp_outliers, nc = FALSE)
{
  # Preliminary stuff
  y <- as.matrix(y)
  tobs <-
    nrow(y) - p                         # length of time series
  Y <-
    y[(p + 1):nrow(y), , drop = FALSE]     # cut away first p lags

  if (!nc) {
    X <- rep(1, tobs)
  } else {
    X <- c()

  }

  for (i in 1:p) {
    Z <- y[((p + 1) - i):(nrow(y) - i), , drop = FALSE]
    X <- cbind(X, Z)
  }

  # Do the QR decomposition
  qr_xmat <- qr(X)

  # Get the OLS coefficients
  A <- qr.coef(qr = qr_xmat, y = Y)

  # Get the OLS residuals
  U <- qr.resid(qr = qr_xmat, y = Y)

  U_adj <- U
  if (sum(temp_outliers) > 0) {
    # Removes non-positive indexed observations
    temp_outliers <- temp_outliers - p
    temp_outliers <- temp_outliers[temp_outliers <= length(U_adj)]
    temp_outliers <- temp_outliers[temp_outliers > 0]
    if (length(temp_outliers) > 0) {
      U_adj <- U_adj[-temp_outliers]
    }
  }

  U_adj <- as.matrix(U_adj)

  # Get the OLS VCov matrix
  # df is total sample-lags-number of regressors
  SIGMA <- sum(square(U_adj)) / (nrow(U_adj) - nrow(A))


  invXX <- qr.solve(crossprod(x = X, y = NULL), tol = 1e-30)

  # Collect results as a list object
  olsvar_outliers <- list()
  olsvar_outliers$A <- A
  olsvar_outliers$SIGMA <- SIGMA
  olsvar_outliers$U <- U_adj
  olsvar_outliers$invXX <- invXX
  olsvar_outliers$X <- X

  return (olsvar_outliers)
}


# Backcast observations based on reversible process
#
# Note: This function depends on functions implemented above
#
# INPUTS:
# y           Time series to implement BN Filter in first differences
# p           AR lags
# delta       Signal to noise ratio
#
# OUTPUTS:
# BN_cycle    The estimated cycle
# BN_cycle_se The estimated cycle standard error
# aux_out     Auxiliary output (AR coefficients & residuals )
backcast <- function(y, p, delta) {
  # Do a few preliminary things
  y_flip <- rev(y)
  y_flip <- as.matrix(y_flip)
  y <- rev(y_flip)
  y <- as.matrix(y)
  nr_y = nrow(y)

  # Compute rho from delta
  rho <- -(1.0 - sqrt(delta)) / sqrt(delta)

  # Re-parametrise model and subtract second differences multiplied by
  # sum of AR coefficients to fix delta.
  # Adjust the LHS variable to take note of this

  # Backcast data
  augmented_y <- rbind(rbind(zeros(p + 2, 1), y), zeros(p + 2, 1))
  augmented_y_iter <- cbind(ones(nrow(augmented_y), 1), augmented_y)

  iter <- 2
  end_aug = p + 2
  while (iter < 100 &&
         abs(mean(augmented_y_iter[1:end_aug, iter] - augmented_y_iter[1:end_aug, iter -
                                                                       1])) > 0.00001 * sd(y)) {
    augmented_y_flip <- rev(augmented_y)
    augmented_y_flip <- as.matrix(augmented_y_flip)

    # Get data matrix from untransformed model. Estimate without a constant
    end_row = p + 2 + nr_y
    tmp_olsvar_df <-
      olsvar_df(y = as.matrix(augmented_y[2:end_row]),
                p = p,
                nc = TRUE)
    tmp_olsvar_df_flip <-
      olsvar_df(y = as.matrix(augmented_y_flip[2:end_row]),
                p = p,
                nc = TRUE)

    X <- tmp_olsvar_df$X[, , drop = FALSE]
    nr_X = nrow(X)
    nc_X = ncol(X)
    X_flip <- tmp_olsvar_df_flip$X[, , drop = FALSE]


    # Get regressors, variance and lags of untransformed AR(p) to perform BN later.
    # Estimate AR by OLS with (for sig_e) and without a constant
    end_row = p + 2
    tmp_olsvar <-
      olsvar(y = rbind(as.matrix(augmented_y[3:end_row]), y),
             p = p,
             nc = TRUE)
    sig2_ols <- tmp_olsvar$SIGMA
    tmp_olsvar_flip <-
      olsvar(y = rbind(as.matrix(augmented_y_flip[3:end_row]), y_flip),
             p = p,
             nc = TRUE)

    X_untransformed <- tmp_olsvar$X[, , drop = FALSE]
    nr_X_untransformed = nrow(X_untransformed)
    nc_X_untransformed = ncol(X_untransformed)
    X_flip_untransformed <- tmp_olsvar_flip$X[, , drop = FALSE]

    start_row = p + 3
    end_row = p + 2 + nr_y
    reparameterised_y <-
      as.matrix(augmented_y[start_row:end_row, , drop = FALSE]) -
      rho * X[, 1]
    reparameterised_y_flip <-
      as.matrix(augmented_y_flip[start_row:end_row, , drop = FALSE]) -
      rho * X_flip[, 1]

    #Calculate other preliminaries before estimation

    # Create Data for transformed model to estimate
    Y <- reparameterised_y
    X <- X[1:nr_X, 2:nc_X]
    Y_flip <- reparameterised_y_flip
    X_flip <- X_flip[1:nr_X, 2:nc_X]

    # Set other parameters for conjugate priors
    A_prior <-
      zeros(p - 1, 1)     # constant and (p-1) phi_star coefficients
    # Uninformative prior on constant centred on zero
    V_prior <-
      diag(drop(repmat(0.5, 1, p - 1) / (square(
        seq(
          from = 1,
          to = p - 1,
          by = 1
        )
      ))))

    # Calculate Posteriors
    V_post <-
      qr.solve(qr.solve(V_prior, tol = 1e-30) + (1.0 / sig2_ols) * crossprod(x = X, y = NULL),
               tol = 1e-30)
    A_post <-
      V_post %*% (qr.solve(V_post, tol = 1e-30) %*% A_prior + t((1.0 / sig2_ols) * X) %*% Y)

    # Add rho back into the posterior of estimated parameters
    A_post <- rbind(rho, A_post)

    # Map the parameters in DF-form back to AR-form
    AR_params <- zeros(p, 1)

    # Last lag
    AR_params[p] <- -A_post[p]
    rseq <- seq(from = p - 1,
                to = 2,
                by = -1)

    for (i in rseq) {
      AR_params[i] <- -A_post[i] - sum(AR_params[i:p])
    }

    # Calculate AR(1) term
    AR_params[1] <- rho - sum(AR_params[2:p])


    # p out of sample forecasts here
    #Add current period in to incoporate current information set to do BN decomposition
    end_col = nc_X_untransformed - 1
    X <-
      rbind(X_untransformed[2:nr_X_untransformed, 1:nc_X_untransformed], cbind(y[nr_y, 1], t(X_untransformed[nr_X_untransformed, 1:end_col])))
    X_flip <-
      rbind(X_flip_untransformed[2:nr_X_untransformed, 1:nc_X_untransformed], cbind(y_flip[nr_y, 1], t(X_flip_untransformed[nr_X_untransformed, 1:end_col])))


    Companion <-
      rbind(t(AR_params), cbind(eye(p - 1), zeros(p - 1, 1)))


    j <- 1
    while (j < p + 3) {
      Companion_j <- eye(nrow(Companion))
      for (i in 1:j - 1) {
        Companion_j <- Companion %*% Companion_j
      }
      X_j = Companion_j %*% as.matrix(X[nrow(X), 1:ncol(X)])
      overwrite_row = p + 2 + nrow(y) + j
      augmented_y[overwrite_row] = t(X_j[1, 1:ncol(X_j)])
      X_j = Companion_j %*% as.matrix(X_flip[nrow(X_flip), 1:ncol(X_flip)])
      augmented_y_flip[overwrite_row] = t(X_j[1, 1:ncol(X_j)])
      j = j + 1
    }


    end_row0 = p + 2
    start_row = p + 2 + nr_y + 1
    end_row = p + 2 + nr_y + p + 2

    augmented_y[1:end_row0] = as.matrix(rev(t(t(
      augmented_y_flip[start_row:end_row]
    ))))

    augmented_y_iter = cbind(augmented_y_iter, augmented_y)

    iter = iter + 1
  }
  end_row = p + 2 + nr_y
  augmented_y = as.matrix(augmented_y[1:end_row])

  # Return backcast data
  return (augmented_y)
}



# Implement the BN Filter imposing a selected 'delta'
#
# Note: This function depends on functions implemented above
#
# INPUTS:
# y           Time series to implement BN Filter in first differences
# p           AR lags
# delta       Signal to noise ratio
#
# OUTPUTS:
# BN_cycle    The estimated cycle
# aux_out     Auxiliary output (AR coefficients & residuals )
BN_Filter <-
  function(y,
           p,
           delta,
           ib)
  {
    # Do a few preliminary things
    y <- as.matrix(y)

    # Compute rho from delta
    rho <- -(1.0 - sqrt(delta)) / sqrt(delta)

    # Re-parametrise model and subtract second differences multiplied by
    # sum of AR coefficients to fix delta.
    # Adjust the LHS variable to take note of this

    # Backcast data
    if (ib) {
      augmented_y <- backcast(y, p, delta)
    }
    else{
      augmented_y <- rbind(zeros(p + 2, 1), y)
    }

    # Get data matrix from untransformed model. Estimate without a constant
    tmp_olsvar_df <-
      olsvar_df(y = augmented_y[2:nrow(augmented_y)], p = p, nc = TRUE)
    X <- tmp_olsvar_df$X[, , drop = FALSE]

    # Get regressors, variance and lags of untransformed AR(p) to perform BN later.
    # Estimate AR by OLS with (for sig_e) and without a constant
    tmp_olsvar <-
      olsvar(y = augmented_y[3:nrow(augmented_y)], p = p, nc = TRUE)
    sig2_ols = tmp_olsvar$SIGMA
    X_untransformed <- tmp_olsvar$X[, , drop = FALSE]

    reparameterised_y <-
      augmented_y[(p + 3):nrow(augmented_y), , drop = FALSE] -
      rho * X[, 1]

    # Calculate the other preliminaries before estimation
    Y <- reparameterised_y
    X <- X[, 2:ncol(X)]

    # Set other parameters for conjugate priors
    A_prior <-
      zeros(p - 1, 1)     # constant and (p-1) phi_star coefficients
    # Uninformative prior on constant centred on zero
    V_prior <-
      diag(drop(repmat(0.5, 1, p - 1) / (square(
        seq(from = 1, to = p - 1, by = 1)
      ))))

    # Calculate Posteriors
    V_post <-
      qr.solve(qr.solve(V_prior, tol = 1e-30) + (1.0 / sig2_ols) * crossprod(x = X, y = NULL),
               tol = 1e-30)
    A_post <-
      V_post %*% (qr.solve(V_post, tol = 1e-30) %*% A_prior + t((1.0 / sig2_ols) * X) %*% Y)

    # Add rho back into the posterior of estimated parameters
    A_post <- rbind(rho, A_post)

    # Map the parameters in DF-form back to AR-form
    AR_params <- zeros(p, 1)

    # Last lag
    AR_params[p] <- -A_post[p]
    rseq <- seq(from = p - 1, to = 2, by = -1)

    for (i in rseq) {
      AR_params[i] <- -A_post[i] - sum(AR_params[i:p])
    }

    # Calculate AR(1) term
    AR_params[1] <- rho - sum(AR_params[2:p])

    # BN Decomposition starts here
    if (ib) {
      X <- rbind(X_untransformed[1:nrow(X_untransformed), , drop = FALSE],
                 cbind(y[nrow(y), 1, drop = FALSE],
                       X_untransformed[nrow(X_untransformed),
                                       1:(ncol(X_untransformed) - 1), drop = FALSE]))
    }
    else {
      X <- rbind(X_untransformed[2:nrow(X_untransformed), , drop = FALSE],
                 cbind(y[nrow(y), 1, drop = FALSE],
                       X_untransformed[nrow(X_untransformed),
                                       1:(ncol(X_untransformed) - 1), drop = FALSE]))
    }

    # Compute the BN cycle
    Companion <-
      rbind(t(AR_params), cbind(eye(p - 1), zeros(p - 1, 1)))
    phi <- -Companion %*% qr.solve(eye(p) - Companion)
    BN_cycle <- phi %*% t(X)
    BN_cycle <- t(BN_cycle[1, , drop = FALSE])

    # Compute the change in trend
    Delta_eta <-
      (1 / (1 - rho)) * (y - X_untransformed %*% AR_params)
    varDeltaBNtrend <- (1 / nrow(y)) * t(Delta_eta) %*% Delta_eta

    # Collect results into list object
    result <- list()
    result$BN_cycle <- BN_cycle
    result$aux_out <- list()
    result$aux_out$AR_coeff <- AR_params
    result$aux_out$residuals <- y - X_untransformed %*% AR_params
    result$aux_out$Delta_eta <- Delta_eta
    result$aux_out$varDeltaBNtrend <- varDeltaBNtrend
    result$aux_out$Companion <- Companion

    return (result)
  }

# Calculates the standard error of the BNF. Must use result from `BN_filter`
BN_Filter_stderr <-
  function(y,
           p,
           dynamic_bands,
           ib,
           window,
           outliers,
           adjusted_bands,
           bnf_result)
  {
    A <- bnf_result$aux_out$Companion
    big_A <- qr.solve(eye(square(nrow(A))) - (A %x% A))
    #var_y <- big_A[1, 1] * sig2e
    vecQ <- zeros(p ^ 2, 1)

    ind_vec <- cbind(1.0, zeros(1, p - 1))
    Phi <- (A %*% qr.solve(eye(p) - A))

    tobs <- nrow(y)


    compute_bn_cycle_se <-
      function(BN_cycle_se_t,
               adjusted_bands) {
        if (dynamic_bands) {
          windp1 <- window + 1
          windm1 <- window - 1

          y_temp <- as.matrix(y[1:window])

          if (adjusted_bands) {
            tmp_olsvar_outliers <- olsvar_outliers(
              y = y_temp,
              p = p,
              temp_outliers = outliers,
              nc = FALSE
            )
            sig2_ols_c_t <- tmp_olsvar_outliers$SIGMA
          } else {
            tmp_olsvar <- olsvar(y = y_temp,
                                 p = p,
                                 nc = FALSE)
            sig2_ols_c_t <- tmp_olsvar$SIGMA
          }

          # Case 1: If window size is less than the length of y
          if (length(y) >= window) {
            vecQ[1, 1] <- sig2_ols_c_t
            vecSigma_X <- big_A %*% vecQ
            Sigma_X_alt <- matrix(vecSigma_X, p, p)

            BN_cycle_se <-
              as.numeric(sqrt(ind_vec %*% Phi %*% Sigma_X_alt %*% t(Phi) %*% t(ind_vec)))
            BN_cycle_se_t[1:window] <-
              BN_cycle_se * rep(1, window)

            for (i in windp1:tobs) {
              i_start <- i - window + 1
              y_temp <- as.matrix(y[i_start:i])
              window_outliers <- outliers - i + window

              if (adjusted_bands) {
                tmp_olsvar_outliers <- olsvar_outliers(
                  y = y_temp,
                  p = p,
                  temp_outliers = window_outliers,
                  nc = FALSE
                )
                sig2_ols_c_t <- tmp_olsvar_outliers$SIGMA
              } else {
                tmp_olsvar <- olsvar(y = y_temp,
                                     p = p,
                                     nc = FALSE)
                sig2_ols_c_t <- tmp_olsvar$SIGMA
              }

              vecQ[1, 1] <- sig2_ols_c_t
              vecSigma_X <- big_A %*% vecQ
              Sigma_X_alt <- matrix(vecSigma_X, p, p)

              BN_cycle_se <-
                as.numeric(sqrt(
                  ind_vec %*% Phi %*% Sigma_X_alt %*% t(Phi) %*% t(ind_vec)
                ))
              BN_cycle_se_t[i] <- BN_cycle_se
            }
          } else {
            # Case 2: If window size exceeds the length of y

            vecQ[1, 1] <- sig2_ols_c_t
            vecSigma_X <- big_A %*% vecQ
            Sigma_X_alt <- matrix(vecSigma_X, p, p)

            BN_cycle_se <-
              as.numeric(sqrt(ind_vec %*% Phi %*% Sigma_X_alt %*% t(Phi) %*% t(ind_vec)))

            BN_cycle_se_t[i] <- BN_cycle_se
          }



        } else {
          if (adjusted_bands) {
            tmp_olsvar_outliers <-
              olsvar_outliers(
                y = y,
                p = p,
                temp_outliers = outliers,
                nc = FALSE
              )
            sig2_ols_c = tmp_olsvar_outliers$SIGMA
          }
          else{
            tmp_olsvar <- olsvar(y = y,
                                 p = p,
                                 nc = FALSE)
            sig2_ols_c = tmp_olsvar$SIGMA
          }

          vecQ[1, 1] <- sig2_ols_c
          vecSigma_X <- big_A %*% vecQ
          Sigma_X_alt <- matrix(vecSigma_X, p, p)

          BN_cycle_se <-
            as.numeric(sqrt(ind_vec %*% Phi %*% Sigma_X_alt %*% t(Phi) %*% t(ind_vec)))
          BN_cycle_se_t <- BN_cycle_se * ones(tobs, 1)

        }
        # Add a row if `ib` is TRUE
        if (ib) {
          BN_cycle_se_t <- rbind(BN_cycle_se_t[1], BN_cycle_se_t)
        }

        return(BN_cycle_se_t)

      }

    # Allocate storage for the demeaned series
    BN_cycle_se <- matrix(data = NA_real_,
                          nrow = tobs,
                          ncol = 1)

    # Calculate both sets of std err.
    if (adjusted_bands) {
      BN_cycle_se_adjusted <- BN_cycle_se

      bnf_result$BN_cycle_adjusted_se <-
        compute_bn_cycle_se(BN_cycle_se_adjusted, adjusted_bands = TRUE)
    }

    bnf_result$BN_cycle_se <-
      compute_bn_cycle_se(BN_cycle_se, adjusted_bands = FALSE)


    return (bnf_result)
  }




# Pick the signal to noise ratio 'delta' by doing a grid search
# from 'd0' in increments of 'dt' to find the first local maximum of
# the amplitude to noise ratio (delta_select=1) or local minimum of variance
# of trend shocks (delta_select=2).
#
# Note: This function depends on functions implemented above
#
# INPUTS:
# y          	Time series
# p          	AR lag order
# d0         	Start grid search here, default is 0.005
# dt         	Increment grid by this amount, default is d0
# option		Selection option (1=max amp-to-noise, 2=min var(trend shocks))
#
# OUTPUTS:
# delta_grid
select_delta <- function(y, p, ib, delta_select, d0, dt)
{
  # Initialise the difference to enter the loop
  diff_t <- 1


  # Initialise the amplitude to noise ratio
  delta_grid <- d0
  tmp <-
    BN_Filter(y, p, delta_grid, ib)
  old_amp_to_noise <-
    var(tmp$BN_cycle) / mean(square(tmp$aux_out$residuals))
  old_precisionDeltaBNtrend <- tmp$aux_out$varDeltaBNtrend

  while (diff_t > 0) {
    delta_grid <- delta_grid + dt
    tmp <-
      BN_Filter(y, p, delta_grid, ib)
    new_amp_to_noise <-
      var(tmp$BN_cycle) / mean(square(tmp$aux_out$residuals))
    new_precisionDeltaBNtrend <- tmp$aux_out$varDeltaBNtrend

    if (delta_select == 1) {
      diff_t <- new_amp_to_noise - old_amp_to_noise
    }

    if (delta_select == 2) {
      diff_t <- -(new_precisionDeltaBNtrend - old_precisionDeltaBNtrend)
    }

    if (diff_t > 0) {
      old_amp_to_noise <- new_amp_to_noise
      old_precisionDeltaBNtrend <- new_precisionDeltaBNtrend
    }
  }

  delta_grid <- delta_grid - dt

  return (delta_grid)
}


