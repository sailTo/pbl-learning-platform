package com.SuperNova.model;

public class DiscussInformation {
    private String s_id;
    private String s_name;
    private int dicussNum;

    public DiscussInformation(String s_id,String s_name,long dicussNum){
        this.s_id = s_id;
        this.s_name = s_name;
        this.dicussNum = (int) dicussNum;
    }

    public String getS_id() {
        return s_id;
    }

    public void setS_id(String s_id) {
        this.s_id = s_id;
    }

    public String getS_name() {
        return s_name;
    }

    public void setS_name(String s_name) {
        this.s_name = s_name;
    }

    public int getDicussNum() {
        return dicussNum;
    }

    public void setDicussNum(int dicussNum) {
        this.dicussNum = dicussNum;
    }
}
