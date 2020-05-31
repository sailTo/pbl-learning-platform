package com.SuperNova.model;

import javax.persistence.*;

public class Project {
    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "c_id")
    private Integer c_id;

    @Column(name = "p_name")
    private String p_name;

    @Column(name = "grading_status")
    private Boolean grading_status;

    @Column(name = "teacher_grade_ratio")
    private Double teacher_grade_ratio;

    @Column(name = "self_grade_ratio")
    private Double self_grade_ratio;

    @Column(name = "mutual_grade_ratio")
    private Double mutual_grade_ratio;

    private String description;

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
     * @return c_id
     */
    public Integer getc_id() {
        return c_id;
    }

    /**
     * @param c_id
     */
    public void setc_id(Integer c_id) {
        this.c_id = c_id;
    }

    /**
     * @return p_name
     */
    public String getp_name() {
        return p_name;
    }

    /**
     * @param p_name
     */
    public void setp_name(String p_name) {
        this.p_name = p_name;
    }

    /**
     * @return grading_status
     */
    public Boolean getgrading_status() {
        return grading_status;
    }

    /**
     * @param grading_status
     */
    public void setgrading_status(Boolean grading_status) {
        this.grading_status = grading_status;
    }

    /**
     * @return teacher_grade_ratio
     */
    public Double getteacher_grade_ratio() {
        return teacher_grade_ratio;
    }

    /**
     * @param teacher_grade_ratio
     */
    public void setteacher_grade_ratio(Double teacher_grade_ratio) {
        this.teacher_grade_ratio = teacher_grade_ratio;
    }

    /**
     * @return self_grade_ratio
     */
    public Double getself_grade_ratio() {
        return self_grade_ratio;
    }

    /**
     * @param self_grade_ratio
     */
    public void setself_grade_ratio(Double self_grade_ratio) {
        this.self_grade_ratio = self_grade_ratio;
    }

    /**
     * @return mutual_grade_ratio
     */
    public Double getmutual_grade_ratio() {
        return mutual_grade_ratio;
    }

    /**
     * @param mutual_grade_ratio
     */
    public void setmutual_grade_ratio(Double mutual_grade_ratio) {
        this.mutual_grade_ratio = mutual_grade_ratio;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }
}