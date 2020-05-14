package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_grade")
public class StudentGrade {
    @Id
    @Column(name = "item_id")
    private Integer itemId;

    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Id
    @Column(name = "s_id")
    private String sId;

    private Integer grade;

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
     * @return s_id
     */
    public String getsId() {
        return sId;
    }

    /**
     * @param sId
     */
    public void setsId(String sId) {
        this.sId = sId;
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