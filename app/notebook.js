// import {repo,executeSql} from "./repository.js";
//
// function ListEntry(list) {
//   if (list == [] || list == null) {
//     list = [];
//     this.length = 0;
//   } else {
//     parse.call(this);
//   }
//
//
//   function parse() {
//     let new_list = [];
//     let node = list.find(
//       function(item) {
//         return item.parent_id == 0;
//       }
//     );
//     while (node != null) {
//       new_list.push(node);
//       let parent_id = node.id;
//
//       node = list.find(
//         function(item) {
//           return item.parent_id == parent_id;
//         }
//       );
//     }
//     // console.log(list,new_list);
//     list = new_list;
//
//     this.length = list.length;
//   }
//
//   this.map = function(callback) {
//     return list.map(callback);
//   }
//
//   this.getLast = function() {
//     if (list.length == 0) {
//       return null;
//     } else {
//       return list[list.length - 1];
//     }
//   }
//
//   this.calculateTotal = function() {
//     if (list.length == 0) {
//       return 0;
//     } else {
//       return list.reduce(
//         function(acc,item) {
//           if (item.type == "IN") {
//             return acc + item.amount;
//           } else {
//             return acc - item.amount;
//           }
//         },
//         0
//       );
//     }
//   }
// }
//
//
// export async function get_list_record(notebook) {
//   // notebook.id
//   console.log(await executeSql("SELECT * FROM `last_entry`",[]),"last_entry");
//   const res = await executeSql(
//     "SELECT * FROM `entry` WHERE `notebook_id`=?",
//     [notebook.id]
//   );
//   console.log(res);
//   return new ListEntry(res.rows);
// }
//
// import {ENTRY_TYPE_IN} from "./entry.js";
//
// export async function add_notebook_entry(list_entry,entry) {
//   const last_amount = list_entry.calculateTotal();
//   let total_amount;
//   if (entry.type == ENTRY_TYPE_IN) {
//     total_amount = last_amount + entry.amount;
//   } else {
//     total_amount = last_amount - entry.amount;
//   }
//
//   const is_last_entry = list_entry.getLast();
//   let parent_id;
//   if (is_last_entry == null) {
//     parent_id = 0;
//   } else {
//     parent_id = is_last_entry.id;
//   }
//
//   return new Promise(function(resolve,reject) {
//     repo.transaction(
//       async function(tx) {
//         try {
//           let notebook = _execute_sql(
//             tx,
//             "UPDATE `notebook` SET amount = ? where id = ?;",
//             [total_amount,entry.getNotebookId()]
//           );
//
//           const _entry = _execute_sql(
//             tx,
//             "INSERT INTO `entry` (type,amount,parent_id,note,notebook_id,inserted_at)  VALUES (?,?,?,?,?,DATETIME('NOW','localtime'));",
//             [entry.getType(), entry.amount, parent_id, entry.note, entry.getNotebookId()]
//           ).then((res) => {
//             const _entry_id = res.insertId
//             const _notebook_id = entry.getNotebookId();
//             let _last_entry =  _execute_sql(
//               tx,
//               "INSERT OR UPDATE `last_entry` (notebook_id,entry_id,amount,inserted_at,type) VALUES (?,?,DATETIME('NOW'),?) WHERE notebook_id = ?",
//               [_notebook_id,_entry_id,entry.amount,entry.getType(),_notebook_id]
//             );
//             tx.executeSql("COMMIT;");
//           }).catch((err) => {console.log(err)});
//
//
//
//           // resolve();
//         } catch (e) {
//           reject(e);
//         }
//       },
//
//     );
//   });
// }
//
//
// async function _execute_sql(tx,query,params) {
//   return new Promise(function(resolve,reject) {
//     tx.executeSql(
//       query,
//       params,
//       function(_tx,res) {
//         console.log("ok");
//         resolve(res);
//
//       },
//       function(err) {
//         console.log("error");
//         reject(err);
//
//       }
//     );
//   });
// }
