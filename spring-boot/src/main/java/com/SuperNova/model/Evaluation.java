package com.SuperNova.model;

import javax.persistence.*;

public class Evaluation {
    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Id
    @Column(name = "active_s_id")
    private String activeSId;

    @Id
    @Column(name = "passive_s_id")
    private String passiveSId;

    private Integer grade;

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
     * @return active_s_id
     */
    public String getActiveSId() {
        return activeSId;
    }

    /**
     * @param activeSId
     */
    public void setActiveSId(String activeSId) {
        this.activeSId = activeSId;
    }

    /**
     * @return passive_s_id
     */
    public String getPassiveSId() {
        return passiveSId;
    }

    /**
     * @param passiveSId
     */
    public void setPassiveSId(String passiveSId) {
        this.passiveSId = passiveSId;
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