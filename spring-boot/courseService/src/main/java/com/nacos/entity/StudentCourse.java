package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "student_course")
public class StudentCourse {
    @Id
    @Column(name = "u_id")
    private String u_id;

    @Id
    @Column(name = "c_id")
    private Integer c_id;

    /**
     * @return u_id
     */
    public String getU_id() {
        return u_id;
    }

    /**
     * @param s_id
     */
    public void setU_id(String s_id) {
        this.u_id = s_id;
    }

    /**
     * @return c_id
     */
    public Integer getC_id() {
        return c_id;
    }

    /**
     * @param c_id
     */
    public void setC_id(Integer c_id) {
        this.c_id = c_id;
    }
}