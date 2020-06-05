package com.SuperNova.model;

import java.util.Date;
import javax.persistence.*;

public class Discussion {
    @Id
    @Column(name = "d_id")
    private Integer d_id;

    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "u_id")
    private String u_id;

    private Date time;

    private String content;

    /**
     * @return d_id
     */
    public Integer getD_id() {
        return d_id;
    }

    /**
     * @param d_id
     */
    public void setD_id(Integer d_id) {
        this.d_id = d_id;
    }

    /**
     * @return p_id
     */
    public Integer getP_id() {
        return p_id;
    }

    /**
     * @param p_id
     */
    public void setP_id(Integer p_id) {
        this.p_id = p_id;
    }

    /**
     * @return u_id
     */
    public String getU_id() {
        return u_id;
    }

    /**
     * @param u_id
     */
    public void setU_id(String u_id) {
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