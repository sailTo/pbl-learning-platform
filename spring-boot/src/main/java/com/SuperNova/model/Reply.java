package com.SuperNova.model;

import java.util.Date;
import javax.persistence.*;

public class Reply {
    @Id
    @Column(name = "r_id")
    private Integer r_id;

    @Column(name = "d_id")
    private Integer d_id;

    @Column(name = "u_id")
    private String u_id;

    private Date time;

    private String content;

    /**
     * @return r_id
     */
    public Integer getr_id() {
        return r_id;
    }

    /**
     * @param r_id
     */
    public void setr_id(Integer r_id) {
        this.r_id = r_id;
    }

    /**
     * @return d_id
     */
    public Integer getd_id() {
        return d_id;
    }

    /**
     * @param d_id
     */
    public void setd_id(Integer d_id) {
        this.d_id = d_id;
    }

    /**
     * @return u_id
     */
    public String getu_id() {
        return u_id;
    }

    /**
     * @param u_id
     */
    public void setu_id(String u_id) {
        this.u_id = u_id;
    }

    /**
     * @return time
     */
    public Date getTime() {
        return time;
    }

    /**
     * @param time
     */
    public void setTime(Date time) {
        this.time = time;
    }

    /**
     * @return content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }
}