package com.SuperNova.model;

import javax.persistence.*;

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
}