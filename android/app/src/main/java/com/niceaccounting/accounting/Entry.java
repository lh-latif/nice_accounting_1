package com.niceaccounting.accounting;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.ColumnInfo;
import androidx.room.ForeignKey;

@Entity
public class Entry {
    @PrimaryKey(autoGenerate = true)
    public int id;

    @ForeignKey(
        childColumns = {"notebook_id"},
        entity = Notebook.class,
        onDelete = ForeignKey.CASCADE,
        parentColumns = {"id"}
    )
    @ColumnInfo(name = "notebook_id")
    public int notebook_id;

    @ColumnInfo(name = "value")
    public int value;

    @ColumnInfo(name = "type")
    public String type;

    @ColumnInfo(name = "note")
    public String note;

}
