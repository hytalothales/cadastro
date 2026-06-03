package com.projeto.cadastro.model;

public class Arquivo {
    private String name;
    private String nf;
    private String date;
    private long timestamp;
    private String content; // Base64 content

    public Arquivo() {}

    public Arquivo(String name, String nf, String date, long timestamp, String content) {
        this.name = name;
        this.nf = nf;
        this.date = date;
        this.timestamp = timestamp;
        this.content = content;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNf() { return nf; }
    public void setNf(String nf) { this.nf = nf; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
