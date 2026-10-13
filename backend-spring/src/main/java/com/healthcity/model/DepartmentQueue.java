package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "department_queues")
public class DepartmentQueue {

    @Id
    @Column(name = "department_id", length = 50)
    private String departmentId;

    @Column(name = "department_name", length = 100)
    private String departmentName;

    @Column(length = 20)
    private String code;

    @Column(name = "current_token", length = 50)
    private String currentToken;

    @Column(name = "next_token", length = 50)
    private String nextToken;

    @Column(length = 50)
    private String status;

    @Column(name = "queue_items", columnDefinition = "TEXT")
    private String queueItems;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    public DepartmentQueue() {}

    public String getDepartmentId() { return departmentId; }
    public void setDepartmentId(String departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getCurrentToken() { return currentToken; }
    public void setCurrentToken(String currentToken) { this.currentToken = currentToken; }

    public String getNextToken() { return nextToken; }
    public void setNextToken(String nextToken) { this.nextToken = nextToken; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getQueueItems() { return queueItems; }
    public void setQueueItems(String queueItems) { this.queueItems = queueItems; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}
