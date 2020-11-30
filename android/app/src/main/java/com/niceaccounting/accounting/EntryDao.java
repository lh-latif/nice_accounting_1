package com.niceaccounting.accounting;

import androidx.room.Dao;
import androidx.room.Query;
import androidx.room.Insert;
import java.util.List;

@Dao
public interface EntryDao {
    @Query("SELECT * FROM entry WHERE entry.notebook_id == :notebookId")
    public List<Entry> listEntryByNotebook(int notebookId);

    @Insert
    public Long addEntry(Entry entry);
}
