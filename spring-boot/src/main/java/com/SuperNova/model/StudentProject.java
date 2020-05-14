package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_project")
public class StudentProject {
    @Id
    @Column(name = "s_id")
    private String sId;

    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Column(name = "is_group_leader")
    private Boolean isGroupLeader;

    @Column(name = "self_grade")
    private Integer selfGrade;

    @Column(name = "mutual_grade")
    private Integer mutualGrade;

    @Column(name = "teacher_grade")
    private Integer teacherGrade;

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
     * @return is_group_leader
     */
    public Boolean getIsGroupLeader() {
        return isGroupLeader;
    }

    /**
     * @param isGroupLeader
     */
    public void setIsGroupLeader(Boolean isGroupLeader) {
        this.isGroupLeader = isGroupLeader;
    }

    /**
     * @return self_grade
     */
    public Integer getSelfGrade() {
        return selfGrade;
    }

    /**
     * @param selfGrade
     */
    public void setSelfGrade(Integer selfGrade) {
        this.selfGrade = selfGrade;
    }

    /**
     * @return mutual_grade
     */
    public Integer getMutualGrade() {
        return mutualGrade;
    }

    /**
     * @param mutualGrade
     */
    public void setMutualGrade(Integer mutualGrade) {
        this.mutualGrade = mutualGrade;
    }

    /**
     * @return teacher_grade
     */
    public Integer getTeacherGrade() {
        return teacherGrade;
    }

    /**
     * @param teacherGrade
     */
    public void setTeacherGrade(Integer teacherGrade) {
        this.teacherGrade = teacherGrade;
    }
}