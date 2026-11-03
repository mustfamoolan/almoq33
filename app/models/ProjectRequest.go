package models

import "time"

// ProjectRequest is a public request submitted from the landing page.
type ProjectRequest struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"size:120;not null" json:"name"`
	Phone       string    `gorm:"size:40;not null" json:"phone"`
	ProjectType string    `gorm:"size:120" json:"project_type"`
	Budget      string    `gorm:"size:80" json:"budget"`
	Message     string    `gorm:"type:text" json:"message"`
	Status      string    `gorm:"size:30;not null;default:new" json:"status"`
	IP          string    `gorm:"size:64" json:"-"`
	CreatedAt   time.Time `json:"created_at"`
}
