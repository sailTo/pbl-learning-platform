package com.SuperNova.model;

import javax.persistence.*;

public class Project {
    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Column(name = "c_id")
    private Integer cId;

    @Column(name = "p_name")
    private String pName;

    @Column(name = "grading_status")
    private Boolean gradingStatus;

    @Column(name = "teacher_grade_ratio")
    private Integer teacherGradeRatio;

    @Column(name = "self_grade_ratio")
    private Integer selfGradeRatio;

    @Column(name = "mutual_grade_ratio")
    private Integer mutualGradeRatio;

    private String description;

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

    /**
     * @return p_name
     */
    public String getpName() {
        return pName;
    }

    /**
     * @param pName
     */
    public void setpName(String pName) {
        this.pName = pName;
    }

    /**
     * @return grading_status
     */
    public Boolean getGradingStatus() {
        return gradingStatus;
    }

    /**
     * @param gradingStatus
     */
    public void setGradingStatus(Boolean gradingStatus) {
        this.gradingStatus = gradingStatus;
    }

    /**
     * @return teacher_grade_ratio
     */
    public Integer getTeacherGradeRatio() {
        return teacherGradeRatio;
    }

    /**
     * @param teacherGradeRatio
     */
    public void setTeacherGradeRatio(Integer teacherGradeRatio) {
        this.teacherGradeRatio = teacherGradeRatio;
    }

    /**
     * @return self_grade_ratio
     */
    public Integer getSelfGradeRatio() {
        return selfGradeRatio;
    }

    /**
     * @param selfGradeRatio
     */
    public void setSelfGradeRatio(Integer selfGradeRatio) {
        this.selfGradeRatio = selfGradeRatio;
    }

    /**
     * @return mutual_grade_ratio
     */
    public Integer getMutualGradeRatio() {
        return mutualGradeRatio;
    }

    /**
     * @param mutualGradeRatio
     */
    public void setMutualGradeRatio(Integer mutualGradeRatio) {
        this.mutualGradeRatio = mutualGradeRatio;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }
}