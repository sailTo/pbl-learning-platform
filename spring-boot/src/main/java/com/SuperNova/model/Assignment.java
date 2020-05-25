package com.SuperNova.model;

import java.util.Date;
import javax.persistence.*;

public class Assignment {
    @Id
    @OrderBy
    @Column(name = "a_id")
    private Integer a_id;

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "a_name")
    private String a_name;

    private Integer importance;

    @Column(name = "a_start_date")
    private Date a_start_date;

    @Column(name = "a_end_date")
    private Date a_end_date;

    @Column(name = "a_description")
    private String a_description;

    /**
     * @return a_id
     */
    public Integer geta_id() {
        return a_id;
    }

    /**
     * @param a_id
     */
    public void seta_id(Integer a_id) {
        this.a_id = a_id;
    }

    /**
     * @return p_id
     */
    public Integer getp_id() {
        return p_id;
    }

    /**
     * @param p_id
     */
    public void setp_id(Integer p_id) {
        this.p_id = p_id;
    }

    /**
     * @return a_name
     */
    public String geta_name() {
        return a_name;
    }

    /**
     * @param a_name
     */
    public void seta_name(String a_name) {
        this.a_name = a_name;
    }

    /**
     * @return importance
     */
    public Integer getImportance() {
        return importance;
    }

    /**
     * @param importance
     */
    public void setImportance(Integer importance) {
        this.importance = importance;
    }

    /**
     * @return a_start_date
     */
    public Date geta_start_date() {
        return a_start_date;
    }

    /**
     * @param a_start_date
     */
    public void seta_start_date(Date a_start_date) {
        this.a_start_date = a_start_date;
    }

    /**
     * @return a_end_date
     */
    public Date geta_end_date() {
        return a_end_date;
    }

    /**
     * @param a_end_date
     */
    public void seta_end_date(Date a_end_date) {
        this.a_end_date = a_end_date;
    }

    /**
     * @return a_description
     */
    public String geta_description() {
        return a_description;
    }

    /**
     * @param a_description
     */
    public void seta_description(String a_description) {
        this.a_description = a_description;
    }
}