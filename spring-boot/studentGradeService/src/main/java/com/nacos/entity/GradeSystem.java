package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "grade_system")
public class GradeSystem {

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Id
    @Column(name = "item_id")
    private Integer item_id;

    @Column(name = "max_grade")
    private Double max_grade;

    private String description;

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
     * @return item_id
     */
    public Integer getItem_id() {
        return item_id;
    }

    /**
     * @param item_id
     */
    public void setItem_id(Integer item_id) {
        this.item_id = item_id;
    }

    /**
     * @return max_grade
     */
    public Double getMax_grade() {
        return max_grade;
    }

    /**
     * @param max_grade
     */
    public void setMax_grade(Double max_grade) {
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