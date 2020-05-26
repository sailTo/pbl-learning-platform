package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_assignment")
public class StudentAssignment {

    @Id
    @Column(name = "a_id")
    private Integer a_id;

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Id
    @Column(name = "u_id")
    private String u_id;

    private Boolean status;

    private Boolean urge;

    /**
     * @return a_id
     */
    public Integer geta_id() {
        return a_id;
    }

    /**
     * @param a_id
     */
    public void seta_id(Integer a_id) {
        this.a_id = a_id;
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
     * @return status
     */
    public Boolean getStatus() {
        return status;
    }

    /**
     * @param status
     */
    public void setStatus(Boolean status) {
        this.status = status;
    }

    /**
     * @return urge
     */
    public Boolean getUrge() {
        return urge;
    }

    /**
     * @param urge
     */
    public void setUrge(Boolean urge) {
        this.urge = urge;
    }
}