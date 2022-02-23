README file for bnf_fcns.R codes

Note: These code files are a translation and extension of some MATLAB code files originally written Ben Wong (benjamin.wong@rbnz.govt.nz)


To use the functions to apply the BN filter:


1. Set the working directory in the R console to the location of the folder that contains the two .R files, as 'bnf_run.R' assumes that 'bnf_fcns.R' is located in the same folder as it is.

Example:

setwd("location/to/files/")

or select "Change Working Directory..." from the relevant drop down menu (File > Change dir...).


2. Load the code into the workspace by typing or pasting the following command in the R session console:

source("bnf_fcns.R")

The 'bnf_run.R' script serves to show how one can use the different methods provided in 'bnf_fcns.R'. 

In any further applied work, one would only need to source the 'bnf_mfcns.R' file.


3. Load the raw data of interest into the workspace and transform as appropriate to define a level series 'y' that is to be detrended.

Please see the 'bnf_run.R' file for a worked example of loading data and transformation options. Also, see the 'bnf_fcn.R' file for standard options of transforming data related to the function, 'transform_series(.)'


4. Once the code is loaded, there are two ways to estimate the cycle using the functions: a) automatic or b) manual:


a) Automatic estimation (bnf(.))

This is the easiest way to estimate the cycle and uses the wrapper function, 'bnf(y, p, d0 = 0.01, dt = 0.01, demean = c("sm", "pm", "dm"), ...)'

Once the bnf(.) function has been run it returns an object of class 'bnf'. A plot method and a print method have been written for this class.

E.g., to plot the BN filter cycle, type the following in the R session console:

plot(bnf(y))

Note, the user can alter any default arguments in the wrapper function 'bnf(.)' to the values of their choice; however, the function argument name should be provided or the order the arguments are passed to the function should be the same.

E.g., to change the number of lags ‘p’ to be 16 lags (the default is 12):

bnf(y, p = 16)

This also works with plotting as well:

plot(bnf(y, p = 16))

The d0 and dt in the wrapper function bnf(.) are used as initial values and increments in automatic selection of the signal-to-noise ratio 'delta' when computing the cycle. These can be left blank in which case the default values of 0.01 and 0.01 will be used. To fix 'delta' use the manual approach below.

The demeaning methods supported include: 

i) sm == use full sample mean

ii) pm == piecewise mean, the user can then provide an atomic vector (ie, c(...)) of break points in ascending order. The default is c(); which is empty

iii) dm == rolling mean, the user can then provide a window length 'wind'. The default is 40.

Please see the 'bnf_run.R' file for a worked example.


b) Manual estimation (BN_Filter(.))

This is more aligned to the original MATLAB codes and is intended for users who wish to adjust all aspects of the cycle estimation.

The user is responsible for all parts of the estimation. They must pre-treat the series 'y' before doing anything further. That includes taking log, difference and demeaning.

Once the series 'y' has been treated, then 'delta' can be estimated using 'max_amp_to_noise(y, p, d0 = 0.01, dt = d0)'

d0 and dt are used to construct the grid points when estimating 'delta'. These can be left blank in which case the default values of 0.01 and 0.01 will be used.

After 'delta' has been estimated the user must then run 'BN_Filter(y, p, delta, compute_stderr = TRUE)', passing along the treated 'y' series, the number of lags 'p', and the 'delta' from the previous step.

The user can also optionally specify if the cycle standard error should be computed by setting 'compute_stderr' to TRUE or FALSE respectively.

'BN_Filter' returns a list object with the cycle located in the 'BN_cycle' member variable.

