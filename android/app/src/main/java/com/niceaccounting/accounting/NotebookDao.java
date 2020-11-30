package com.niceaccounting.accounting;

import androidx.room.Dao;
import androidx.room.Query;
import androidx.room.Insert;
import androidx.room.Delete;
import java.util.List;

@Dao
public interface NotebookDao {
    @Query("SELECT * FROM notebook")
    public List<Notebook> listNotebook();

    @Insert
    public long addNotebook(Notebook notebook);

    @Query("SELECT * FROM notebook WHERE notebook.id == :id")
    public Notebook getNotebook(int id);

    @Query(
        "UPDATE notebook "+
        "SET name = :name, note = :note " +
        "WHERE id == :id"
    )
    public int editNotebook(int id, String name, String note);

    @Query("UPDATE notebook SET amount = :amount WHERE id == :id")
    public void updateAmount(int id, int amount);

    @Delete
    public int deleteNotebook(Notebook notebook);


}
