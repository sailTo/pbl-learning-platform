package com.SuperNova.model;

import javax.persistence.*;

public class Evaluation {

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Id
    @Column(name = "active_s_id")
    private String active_s_id;

    @Id
    @Column(name = "passive_s_id")
    private String passive_s_id;

    private Integer grade;

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
     * @return active_s_id
     */
    public String getactive_s_id() {
        return active_s_id;
    }

    /**
     * @param active_s_id
     */
    public void setactive_s_id(String active_s_id) {
        this.active_s_id = active_s_id;
    }

    /**
     * @return passive_s_id
     */
    public String getpassive_s_id() {
        return passive_s_id;
    }

    /**
     * @param passive_s_id
     */
    public void setpassive_s_id(String passive_s_id) {
        this.passive_s_id = passive_s_id;
    }

    /**
     * @return grade
     */
    public Integer getGrade() {
        return grade;
    }

    /**
     * @param grade
     */
    public void setGrade(Integer grade) {
        this.grade = grade;
    }
}