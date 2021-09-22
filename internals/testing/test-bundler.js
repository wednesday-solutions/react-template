// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'regenerator-runtime/runtime';
// babel/polyfil is depreciated, and the import cost was aruond 120+k
// importing renegrator-runtime reduced the import cost to 6.7k
