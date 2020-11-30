// import {openDatabase as openSqlite} from "expo-sqlite";
//
// const DEV_MODE = true;
//
// export const repo = openSqlite("main.db");
//
// export async function executeSql(query,params) {
//   return new Promise(function(resolve,error) {
//     repo.transaction(
//       function(tx) {
//         tx.executeSql(
//           query,
//           params,
//           function(_tx,res) {
//             resolve({rows: res.rows._array});
//           },
//           function(_tx,res) {
//             error(res);
//           }
//         );
//       }
//     );
//   })
// }
//
//
//
// function add_notebook_table(tx) {
//   const createTable = `
//     CREATE TABLE IF NOT EXISTS notebook (
//       id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
//       name text NULL,
//       amount INTEGER
//     );
//   `;
//   tx.executeSql(
//     createTable,
//     [],
//     function(_tx,res) {
//       // console.log(res);
//     },
//     function(_tx,res) {
//       // console.log(res);
//     }
//   );
// }
//
// function add_record_table(tx) {
//
//   const createTable = `
//     CREATE TABLE IF NOT EXISTS entry (
//       id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
//       type varchar(25) NOT NULL,
//       amount integer NOT NULL,
//       parent_id INTEGER,
//       note text,
//       notebook_id bigInt NOT NULL,
//       inserted_at DATETIME NOT NULL,
//       CONSTRAINT fk_notebook_id
//         FOREIGN KEY(notebook_id) REFERENCES notebook(id)
//     );
//   `;
//   tx.executeSql(
//     createTable,
//     [],
//     function(_tx,res) {
//       // console.log(res);
//     },
//     function(_tx,res) {
//       // console.log(res);
//     }
//   );
// }
//
// function add_last_entry_table(tx) {
//   const createTable = `
//     CREATE TABLE IF NOT EXISTS last_entry (
//       notebook_id INTEGER NOT NULL PRIMARY KEY,
//       entry_id INTEGER NOT NULL,
//       amount INTEGER NOT NULL,
//       type STRING(10) NOT NULL,
//       inserted_at DATETIME NOT NULL,
//       CONSTRAINT fk_notebook_id
//         FOREIGN KEY (notebook_id) REFERENCES notebook(id),
//       CONSTRAINT fk_entry_id
//         FOREIGN KEY (entry_id) REFERENCES entry(id)
//     )
//   `;
//
//   tx.executeSql(
//     createTable,
//     [],
//     function(_tx,error) {
//       // report(error);
//       console.log("1",error,"error");
//     },
//     function(_tx,result) {
//       // resolve(result);
//     }
//   )
//   // return new Promise(function(resolve,report) {
//   //
//   // });
// }
//
// //
// // const transaction = db.transaction(
// //   function(tx) {
// //     add_notebook_table(tx);
// //     add_record_table(tx);
// //     // delete_all_tables(tx);
// //     return tx;
// //   },
// //   function(res,res1) {
// //     console.log(res1,"error");
// //   },
// //   function(res) {
// //     console.log("ok");
// //   }
// // );
//
// function remove_all_table() {
//   repo.transaction(function(tx) {
//     tx.executeSql(
//       "DROP TABLE IF EXISTS 'entry'"
//     );
//     tx.executeSql(
//       "DROP TABLE IF EXISTS 'notebook'"
//     );
//     tx.executeSql(
//       "DROP TABLE IF EXISTS 'last_entry'"
//     );
//   });
// }
//
// function migration() {
//   if (DEV_MODE == true) {
//     remove_all_table();
//   }
//   repo.transaction(async function(tx) {
//     add_notebook_table(tx);
//     add_record_table(tx);
//     add_last_entry_table(tx);
//   });
// }
//
// migration();
//
// // console.log(transaction,"trans");
//
// // list_notebook();
// // add_notebook("Keseharian");
