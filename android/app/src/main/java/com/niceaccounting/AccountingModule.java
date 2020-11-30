package com.niceaccounting;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.niceaccounting.accounting.AccountingDatabase;
import com.niceaccounting.accounting.Entry;
import com.niceaccounting.accounting.EntryModel;
import com.niceaccounting.accounting.Notebook;
import com.niceaccounting.accounting.Statistic;
import androidx.room.Room;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.stream.JsonParser;
import javax.json.JsonObject;
import java.util.Iterator;
import java.io.StringReader;
import android.util.JsonReader;
import java.io.IOException;

public class AccountingModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static AccountingDatabase db;

    @Override
    public String getName() {
        return "AccountingModule";
    }

    // @ReactMethod
    // public String helloWorld(String text) {
    //     return text;
    // }
    //
    // @ReactMethod
    // public void getInt(Promise promise) {
    //     promise.resolve(100);
    // }

    @ReactMethod
    public void addNotebook(String name, String note, Promise promise) {
        try {
            Notebook notebook = new Notebook();
            notebook.name = name;
            notebook.note = note;
            Long id = db.accountingDao().addNotebook(notebook);
            promise.resolve(id.intValue());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void getNotebook(int notebookId, Promise promise) {
        try {
            Notebook notebook = db.notebookDao().getNotebook(notebookId);
            promise.resolve(
                Json.createObjectBuilder()
                .add("id",notebook.id)
                .add("name", notebook.name)
                .add("note", notebook.note)
                .build()
                .toString()
            );
        } catch(Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void listNotebook(Promise promise) {
        try {
            Iterator<Notebook> itr = db.notebookDao().listNotebook().iterator();
            JsonArrayBuilder listNoteBuilder = Json.createArrayBuilder();
            Notebook nb;
            while(itr.hasNext()) {
                nb = itr.next();
                listNoteBuilder.add(
                    Json.createObjectBuilder()
                    .add("id", nb.id)
                    .add("name", nb.name)
                    .add("amount", nb.amount)
                    .build()
                );
            }
            promise.resolve(listNoteBuilder.build().toString());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void listNotebookEntry(int id, Promise promise) {
        try {
            Iterator<Entry> itr = db.entryDao().listEntryByNotebook(id).iterator();
            JsonArrayBuilder listEntryBuilder = Json.createArrayBuilder();
            Entry entry;
            while (itr.hasNext()) {
                entry = itr.next();
                listEntryBuilder.add(
                    Json.createObjectBuilder()
                    .add("id", entry.id)
                    .add("type", entry.type)
                    .add("value", entry.value)
                    .add("note", entry.note)
                    .build()
                );
            }
            promise.resolve(listEntryBuilder.build().toString());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void addNotebookEntry(String jsonString, Promise promise) {
        try {
            // jsonReaderMethod(jsonString, promise);
            final JsonParser parser = Json.createParser(new StringReader(jsonString));
            parser.next();
            final JsonObject entryObject = parser.getObject();
            final Entry entry = new Entry();
            entry.type = entryObject.getString("type", null);
            entry.value = entryObject.getInt("value");
            entry.note = entryObject.getString("note");
            entry.notebook_id = entryObject.getInt("notebook_id");
            EntryModel.check_required(entry);

            Notebook notebook = db.notebookDao().getNotebook(entry.notebook_id);
            if (notebook == null) {
                throw new Exception("Notebook not found");
            }

            // promise.resolve(entry.type.equals("in"));
            // return;
            // // entry.type = "in";

            if (entry.type.equals("in")) {
                notebook.amount += entry.value;
            } else {
                notebook.amount -= entry.value;
            }

            int entryId = db.addNotebookEntry(
                notebook,
                entry
            );
            promise.resolve(entryId);
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    protected void jsonReaderMethod(String jsonString, Promise promise) throws IOException {
        JsonReader jr = new JsonReader(new StringReader(jsonString));
        jr.beginObject();
        String name;
        while(jr.hasNext()) {
            name = jr.nextName();
            if (name.equals("type")) {
                promise.resolve(jr.nextString().equals("in"));
                break;
            } else {
                jr.skipValue();
            }
        }
    }

    @ReactMethod
    public void getStatistic(int id, Promise promise) {
        try {
            final Statistic stats = db.statisticDao().getStatistic(id);
            promise.resolve(
                Json.createObjectBuilder()
                .add("id", stats.id)
                .add("last_entry", stats.last_entry)
                .build()
                .toString()
            );
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }

    }

    // public void addEntry(int id, )

    AccountingModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        db = Room.databaseBuilder(
            context,
            AccountingDatabase.class,
            "main"
        ).fallbackToDestructiveMigration().build();
    }
}
