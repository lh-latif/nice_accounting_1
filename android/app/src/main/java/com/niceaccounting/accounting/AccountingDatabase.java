package com.niceaccounting.accounting;

import com.niceaccounting.accounting.NotebookDao;
import com.niceaccounting.accounting.EntryDao;
import androidx.room.Database;
import androidx.room.RoomDatabase;
import java.util.List;

@Database(entities = {Entry.class, Notebook.class, Statistic.class}, version = 2)
public abstract class AccountingDatabase extends RoomDatabase {
    public abstract NotebookDao notebookDao();

    public abstract EntryDao entryDao();

    public abstract StatisticDao statisticDao();

    public abstract AccountingDao accountingDao();

    public int addNotebookEntry(Notebook notebook, Entry entry) {
        return accountingDao().addNotebookEntry(
            notebookDao(),
            entryDao(),
            notebook,
            entry
        );
    }
}
