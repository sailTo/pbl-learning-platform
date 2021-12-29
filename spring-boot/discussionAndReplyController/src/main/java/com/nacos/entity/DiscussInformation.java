package com.nacos.entity;

public class DiscussInformation {
    private String s_id;
    private String s_name;
    private int discussNum;

    public DiscussInformation(String s_id, String s_name, long discussNum){
        this.s_id = s_id;
        this.s_name = s_name;
        this.discussNum = (int) discussNum;
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

    public int getDiscussNum() {
        return discussNum;
    }

    public void setDiscussNum(int discussNum) {
        this.discussNum = discussNum;
    }
}
