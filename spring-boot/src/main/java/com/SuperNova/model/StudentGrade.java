package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_grade")
public class StudentGrade {

    @Id
    @Column(name = "item_id")
    private Integer item_id;

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Id
    @Column(name = "u_id")
    private String u_id;

    private Integer grade;

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
     * @return u_id
     */
    public String gets_id() {
        return u_id;
    }

    /**
     * @param s_id
     */
    public void sets_id(String s_id) {
        this.u_id = s_id;
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