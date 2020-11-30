package com.niceaccounting.accounting;

import androidx.room.Dao;
import androidx.room.Query;
// import androidx.room.

@Dao
public abstract class StatisticDao {
    @Query("SELECT * FROM statistic WHERE statistic.id == :id")
    public abstract Statistic getStatistic(int id);
}
