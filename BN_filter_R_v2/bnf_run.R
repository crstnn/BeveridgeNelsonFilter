####################################################################################################
# Example using US data to illustrate how to use the various 'bnf' methods 
####################################################################################################

# Clear the workspace -- comment out if you have loaded other packages already
rm(list = ls(all = TRUE))
gc()

# Source required functions
source("bnf_fcns.R")

# Read in US centric data to use for the demonstration
usdata <- read.csv(file = 'us_data.csv', header = TRUE, stringsAsFactors = FALSE)
#usdata <- read.csv(file = 'USGDP_updated.csv', header = TRUE, stringsAsFactors = FALSE)

# Make the series GDP a 'ts' object
# type 'help(ts)' in the R console for more information
gdp <- ts(data = usdata$GDPC1, end = c(2016, 2), frequency = 4)
#gdp <- ts(data = usdata$GDPC1, end = c(2021, 2), frequency = 4)

#Take logs and multiply by 100
y <- transform_series(y = gdp, take_log = TRUE, pcode = "p1") # same as: log(raw_y) * 100.0

# Example: Automatically determined delta and full sample mean demeaning method
cat("Example: log US real GDP\n\n")

bnfOutput <- bnf(y, window = 40, demean = "dm", delta_select = 2, ib = T)    
# defaults are 'p = 12', 'd0 = 0.005' and 'dt = d0' values, 'demean = "sm"' sample mean, `wind = window' 
# "dm" is dynamic demeaning, '"pm", breaks = c(50, 75, 100, 125, 150)' allows for breaks at set dates

write.csv(bnfOutput$cycle, "us_cycle_R_bnf.csv")
plot(bnfOutput, main = "US Output Gap", col = "red")
cat("\nPrinting out cycle data...\n")
print(bnfOutput) # comment this command to stop the cycle data being printed to the console
cat('\n')

# EOF
