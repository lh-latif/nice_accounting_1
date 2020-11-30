package com.niceaccounting.accounting;

import androidx.room.Dao;
import androidx.room.Query;
import androidx.room.Insert;
import java.util.List;

@Dao
public interface EntryDao {
    @Query("SELECT * FROM entry WHERE entry.notebook_id == :notebookId")
    public List<Entry> listEntryByNotebook(int notebookId);

    @Query(
        "INSERT INTO entry (notebook_id, value, type, note, inserted_at) "+
        "VALUES (:notebook_id, :value, :type, :note, strftime(\"%Y-%m-%dT%H:%M:%S\",\"now\"))"
    )
    public long addEntry(
        int notebook_id, int value,
        String type, String note
    );
}
