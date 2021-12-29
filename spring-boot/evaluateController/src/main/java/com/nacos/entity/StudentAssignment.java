package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

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
    public Integer getA_id() {
        return a_id;
    }

    /**
     * @param a_id
     */
    public void setA_id(Integer a_id) {
        this.a_id = a_id;
    }

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
     * @return u_id
     */
    public String getU_id() {
        return u_id;
    }

    /**
     * @param u_id
     */
    public void setU_id(String u_id) {
        this.u_id = u_id;
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