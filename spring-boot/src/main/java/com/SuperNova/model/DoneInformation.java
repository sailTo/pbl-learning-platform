package com.SuperNova.model;

public class DoneInformation {
    private String s_id;
    private String s_name;
    private int doneNum;

    public DoneInformation(String s_id,String s_name,long doneNum){
        this.s_id = s_id;
        this.s_name = s_name;
        this.doneNum = (int) doneNum;
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

    public int getDoneNum() {
        return doneNum;
    }

    public void setDoneNum(int doneNum) {
        this.doneNum = doneNum;
    }
}
