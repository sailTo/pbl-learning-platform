package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;

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

    private Double grade;

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
     * @return active_s_id
     */
    public String getActive_s_id() {
        return active_s_id;
    }

    /**
     * @param active_s_id
     */
    public void setActive_s_id(String active_s_id) {
        this.active_s_id = active_s_id;
    }

    /**
     * @return passive_s_id
     */
    public String getPassive_s_id() {
        return passive_s_id;
    }

    /**
     * @param passive_s_id
     */
    public void setPassive_s_id(String passive_s_id) {
        this.passive_s_id = passive_s_id;
    }

    /**
     * @return grade
     */
    public Double getGrade() {
        return grade;
    }

    /**
     * @param grade
     */
    public void setGrade(Double grade) {
        this.grade = grade;
    }
}