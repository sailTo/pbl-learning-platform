package com.SuperNova.model;

import javax.persistence.*;

public class File {
    @Id
    @Column(name = "f_id")
    private Integer fId;

    @Id
    @Column(name = "p_id")
    private Integer pId;

    @Column(name = "u_id")
    private String uId;

    @Column(name = "f_name")
    private String fName;

    @Column(name = "file_URL")
    private String fileUrl;

    private String description;

    /**
     * @return f_id
     */
    public Integer getfId() {
        return fId;
    }

    /**
     * @param fId
     */
    public void setfId(Integer fId) {
        this.fId = fId;
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
     * @return u_id
     */
    public String getuId() {
        return uId;
    }

    /**
     * @param uId
     */
    public void setuId(String uId) {
        this.uId = uId;
    }

    /**
     * @return f_name
     */
    public String getfName() {
        return fName;
    }

    /**
     * @param fName
     */
    public void setfName(String fName) {
        this.fName = fName;
    }

    /**
     * @return file_URL
     */
    public String getFileUrl() {
        return fileUrl;
    }

    /**
     * @param fileUrl
     */
    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
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