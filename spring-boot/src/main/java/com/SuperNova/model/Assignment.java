package com.SuperNova.model;

import java.util.Date;
import javax.persistence.*;

public class Assignment {
    @Id
    @Column(name = "a_id")
    private Integer aId;

    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Column(name = "a_name")
    private String aName;

    private Integer importance;

    @Column(name = "a_start_date")
    private Date aStartDate;

    @Column(name = "a_end_date")
    private Date aEndDate;

    @Column(name = "a_description")
    private String aDescription;

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
     * @return a_name
     */
    public String getaName() {
        return aName;
    }

    /**
     * @param aName
     */
    public void setaName(String aName) {
        this.aName = aName;
    }

    /**
     * @return importance
     */
    public Integer getImportance() {
        return importance;
    }

    /**
     * @param importance
     */
    public void setImportance(Integer importance) {
        this.importance = importance;
    }

    /**
     * @return a_start_date
     */
    public Date getaStartDate() {
        return aStartDate;
    }

    /**
     * @param aStartDate
     */
    public void setaStartDate(Date aStartDate) {
        this.aStartDate = aStartDate;
    }

    /**
     * @return a_end_date
     */
    public Date getaEndDate() {
        return aEndDate;
    }

    /**
     * @param aEndDate
     */
    public void setaEndDate(Date aEndDate) {
        this.aEndDate = aEndDate;
    }

    /**
     * @return a_description
     */
    public String getaDescription() {
        return aDescription;
    }

    /**
     * @param aDescription
     */
    public void setaDescription(String aDescription) {
        this.aDescription = aDescription;
    }
}