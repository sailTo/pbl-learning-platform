package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_course")
public class StudentCourse {
    @Id
    @Column(name = "s_id")
    private String sId;

    @Id
    @Column(name = "c_id")
    private Integer cId;

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
     * @return c_id
     */
    public Integer getcId() {
        return cId;
    }

    /**
     * @param cId
     */
    public void setcId(Integer cId) {
        this.cId = cId;
    }
}