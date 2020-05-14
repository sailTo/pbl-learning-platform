package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "grade_system")
public class GradeSystem {
    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Id
    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "max_grade")
    private Integer maxGrade;

    private String description;

    /**
     * @return p_id
     */
    public Integer getpId() {
        return pId;
    }

    /**
     * @param pId
     */
    public void setpId(Integer pId) {
        this.pId = pId;
    }

    /**
     * @return item_id
     */
    public Integer getItemId() {
        return itemId;
    }

    /**
     * @param itemId
     */
    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    /**
     * @return max_grade
     */
    public Integer getMaxGrade() {
        return maxGrade;
    }

    /**
     * @param maxGrade
     */
    public void setMaxGrade(Integer maxGrade) {
        this.maxGrade = maxGrade;
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