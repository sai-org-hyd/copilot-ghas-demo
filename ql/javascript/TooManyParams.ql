/**
 * @name Function with too many parameters
 * @description Finds functions that have more than 3 parameters.
 * @kind problem
 * @id javascript/too-many-params
 * @problem.severity warning
 */
import javascript

from Function f
where count(f.getAParameter()) > 3
select f, "This function has " + count(f.getAParameter()).toString() + " parameters."