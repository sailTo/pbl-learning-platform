package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_assignment")
public class StudentAssignment {
    @Id
    @Column(name = "a_id")
    private Integer aId;

    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Id
    @Column(name = "s_id")
    private String sId;

    private Boolean status;

    private Boolean urge;

    /**
     * @return a_id
     */
    public Integer getaId() {
        return aId;
    }

    /**
     * @param aId
     */
    public void setaId(Integer aId) {
        this.aId = aId;
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