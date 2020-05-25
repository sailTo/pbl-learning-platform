package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "grade_system")
public class GradeSystem {

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Id
    @Column(name = "item_id")
    private Integer item_id;

    @Column(name = "max_grade")
    private Integer max_grade;

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
     * @return item_id
     */
    public Integer getitem_id() {
        return item_id;
    }

    /**
     * @param item_id
     */
    public void setitem_id(Integer item_id) {
        this.item_id = item_id;
    }

    /**
     * @return max_grade
     */
    public Integer getmax_grade() {
        return max_grade;
    }

    /**
     * @param max_grade
     */
    public void setmax_grade(Integer max_grade) {
        this.max_grade = max_grade;
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