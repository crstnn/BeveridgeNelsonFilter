This code calculates the BN filter output gap with the automatic signal-to-noise selection criteria described in Kamber, Morley and Wong (2018) (KMW2018 hereafter), "Intuitive and Reliable Estimates of the Output Gap from a Beveridge-Nelson Filter," Review of Economics and Statistics 100 (3), 550-566 https://doi.org/10.1162/rest_a_00691

It has also been updated to allow refinements of the original BN filter, as described in Kamber, Morley and Wong (2024) (KMW2024 hereafter), "Trend-Cycle Decomposition in the Presence of Large Shocks" (https://ideas.repec.org/p/een/camaaa/2024-24.html) and in further detail below.

bnf_run.R is the main file, with data input and various choices about estimation to be made in this file. bnf_fcn.R contains all of the functions called from the main file.

To allow for possible structural breaks in the long-run drift of a time series, we include options to implement dynamic demeaning as described in KMW2018 or to enter breakdate(s) informed by a test such as Bai-Perron.

We also allow the possibility of imposing no drift in levels, such as might be case for variables like the unemployment rate or inflation.

To implement the BN filter, one needs four inputs: The data in first differences of the series being detrended, the lag order of the restricted AR model used in estimation, an indicator of whether or not iterative backcasting is employed, and a signal-to-noise ratio delta.

The code was modified in October 2021 to allow calculation of error bands according to the formula in the online appendix of BMW2018 (the online appendix is also available at https://doi.org/10.1162/rest_a_00691).

As proposed in KMW2024, we have modified the original code to allow four refinements relative to KMW2018:
1) an alternative automatic selection of delta based on the local minimum of the variance of trend shocks rather than local maximum of the amplitude-to-noise ratio
2) iterative dynamic mean adjustment that uses estimates of trend instead of overall growth to avoid undue influence of outlier cyclical observations
3) dynamic estimation of BN cycle variance using the same window as dynamic demeaning for purposes of constructing more accurate 95% error bands
4) an option of iterative backcasting (until parameter estimates/backcasts converge) that uses the reversibility of the restricted AR process to backcast output growth prior to the initial observation, allowing for calculation of the BN filter cycle for the first observation in levels instead of from the second observation in levels  

We are not responsible for any loss you may incur, financial or otherwise, by using our code
If you use the code, please cite and acknowledge the paper.

Gunes Kamber
James Morley
Benjamin Wong
December 2024

