package controllers

import (
	"strings"
	"unicode/utf8"

	"almoq33/app/models"
	"almoq33/bootstrap"
	"github.com/gofiber/fiber/v2"
)

type ProjectRequestController struct{}

type projectRequestInput struct {
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	ProjectType string `json:"project_type"`
	Budget      string `json:"budget"`
	Message     string `json:"message"`
	Company     string `json:"company"` // honeypot, must stay empty
}

// Store accepts a project request from the public landing page.
func (pc *ProjectRequestController) Store(c *fiber.Ctx) error {
	var in projectRequestInput
	if err := c.BodyParser(&in); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "بيانات غير صالحة"})
	}

	// Silently accept bot submissions that fill the hidden honeypot.
	if strings.TrimSpace(in.Company) != "" {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"ok": true})
	}

	in.Name = strings.TrimSpace(in.Name)
	in.Phone = strings.TrimSpace(in.Phone)
	in.ProjectType = strings.TrimSpace(in.ProjectType)
	in.Budget = strings.TrimSpace(in.Budget)
	in.Message = strings.TrimSpace(in.Message)

	if utf8.RuneCountInString(in.Name) < 2 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{"error": "الاسم مطلوب"})
	}
	if len(in.Phone) < 6 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{"error": "رقم التواصل غير صالح"})
	}
	if utf8.RuneCountInString(in.Message) < 10 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{"error": "اكتب وصفاً مختصراً للمشروع (10 أحرف على الأقل)"})
	}
	if utf8.RuneCountInString(in.Message) > 4000 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{"error": "الوصف طويل جداً"})
	}

	request := models.ProjectRequest{
		Name:        in.Name,
		Phone:       in.Phone,
		ProjectType: in.ProjectType,
		Budget:      in.Budget,
		Message:     in.Message,
		Status:      "new",
		IP:          c.IP(),
	}

	if err := bootstrap.DB.Create(&request).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "تعذر حفظ الطلب، حاول مرة أخرى"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"ok": true, "id": request.ID})
}
