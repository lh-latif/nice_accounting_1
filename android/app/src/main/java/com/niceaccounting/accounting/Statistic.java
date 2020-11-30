package com.niceaccounting.accounting;

import androidx.room.Entity;
import androidx.room.ColumnInfo;
import androidx.room.PrimaryKey;
import androidx.room.ForeignKey;

@Entity
public class Statistic {
    @PrimaryKey
    @ForeignKey(
        childColumns = {"id"},
        parentColumns = {"id"},
        entity = Notebook.class,
        onDelete = ForeignKey.CASCADE
    )
    public int id;


    @ForeignKey(
        childColumns = {"last_entry"},
        parentColumns = {"id"},
        entity = Entry.class
    )
    public int last_entry;

}
