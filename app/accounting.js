// import {repo,executeSql} from "./repository.js";
//
// const db = repo;
//
//
// export function list_notebook() {
//   return executeSql(
//     "SELECT * FROM `notebook`",
//     []
//   );
// }
//
// 
// export async function get_notebook(id) {
//   return executeSql(
//     "SELECT * FROM `notebook` WHERE id=?",
//     [id]
//   );
// }
//
// export function add_notebook(name) {
//   return executeSql(
//     "INSERT INTO `notebook` (name) VALUES (?)",
//     [name]
//   );
// }
//
// export function edit_notebook(notebook,name) {
//   return new Promise(function(resolve,error) {
//     db.transaction(
//       function(tx) {
//         tx.executeSql(
//           "UPDATE `notebook` VALUES name=? WHERE id=? ",
//           [notebook.id,name]
//         );
//       },
//       error,
//       resolve
//     );
//   });
// }
//
// export function delete_notebook(notebook) {
//   return new Promise(function(resolve,error) {
//     db.transaction(
//       function(tx) {
//         tx.executeSql(
//           "DELETE FROM `notebook` WHERE id=?",
//           [notebook.id]
//         );
//       }
//     );
//   });
// }
//
// export async function getDirectory() {
//   try {
//     return fs.documentDirectory;
//   } catch(e) {
//     console.log(e, "error");
//   }
//
// }
