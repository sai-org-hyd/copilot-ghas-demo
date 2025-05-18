/**
 * @name If statement with assignment in condition
 * @description Finds 'if' statements where the condition is an assignment, which is often a mistake.
 * @kind problem
 * @id javascript/if-assignment
 * @problem.severity warning
 * @tags maintainability
 */
import javascript

from IfStmt ifStmt, AssignExpr assignment
where ifStmt.getCondition() = assignment
select ifStmt, "This 'if' statement's condition is an assignment. Did you intend a comparison?"