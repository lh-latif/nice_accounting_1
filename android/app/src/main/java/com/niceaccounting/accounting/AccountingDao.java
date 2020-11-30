package com.niceaccounting.accounting;

import androidx.room.Dao;
import androidx.room.Query;
import androidx.room.Insert;
import androidx.room.Transaction;

@Dao
public abstract class AccountingDao {
    @Insert
    protected abstract long addNotebookMethod(Notebook notebook);

    @Insert
    protected abstract long addNotebookStatistic(Statistic statistic);

    @Transaction
    public Long addNotebook(Notebook notebook) {
        Long id = addNotebookMethod(notebook);
        Statistic stats = new Statistic();
        stats.id = id.intValue();
        addNotebookStatistic(stats);
        return id;
    }

    @Query("SELECT * FROM statistic WHERE statistic.id == :id")
    protected abstract Statistic getStatistic(int id);

    @Query(
        "UPDATE statistic "+
        "SET last_entry = :entry_id "+
        "WHERE statistic.id == :id"
    )
    protected abstract void updateStatistic(int entry_id, int id);

    @Transaction
    public int addNotebookEntry(NotebookDao noteDao, EntryDao entryDao, Notebook notebook, Entry entry) {
        Statistic statistic = getStatistic(entry.notebook_id);
        Long id = entryDao.addEntry(
            entry.notebook_id, entry.value,
            entry.type, entry.note
        );
        // int idInt = id.intValue();
        noteDao.updateAmount(notebook.id, notebook.amount);
        updateStatistic(id.intValue(), statistic.id);
        return id.intValue();
    }
}
