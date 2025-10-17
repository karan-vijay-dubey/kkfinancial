import type { Express } from "express";
import { storage } from "./storage";
import { consultationRequestSchema } from "@shared/schema";
import { z } from "zod";
import { emailService } from "./email";

export function registerRoutes(app: Express) {
  // Submit consultation request
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = consultationRequestSchema.parse(req.body);
      
      // Store the consultation request
      const storedRequest = await storage.createConsultationRequest(validatedData);
      
      // Send email notification to business
      try {
        await emailService.sendConsultationNotification(validatedData);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Failed to send email notification:", emailError);
      }
      
      res.json({
        success: true,
        id: storedRequest.id,
        message: "Consultation request submitted successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          errors: error.errors,
          message: "Validation failed",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to submit consultation request",
        });
      }
    }
  });

  // Get all consultation requests (admin)
  app.get("/api/consultations", async (req, res) => {
    try {
      const requests = await storage.getConsultationRequests();
      res.json({
        success: true,
        data: requests,
        count: requests.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve consultation requests",
      });
    }
  });

  // Get consultation request by ID
  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const request = await storage.getConsultationRequestById(req.params.id);
      
      if (!request) {
        res.status(404).json({
          success: false,
          message: "Consultation request not found",
        });
        return;
      }

      res.json({
        success: true,
        data: request,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve consultation request",
      });
    }
  });

  // Update consultation status
  app.patch("/api/consultations/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!["pending", "contacted", "completed"].includes(status)) {
        res.status(400).json({
          success: false,
          message: "Invalid status value",
        });
        return;
      }

      const updatedRequest = await storage.updateConsultationStatus(
        req.params.id,
        status
      );

      if (!updatedRequest) {
        res.status(404).json({
          success: false,
          message: "Consultation request not found",
        });
        return;
      }

      res.json({
        success: true,
        data: updatedRequest,
        message: "Status updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update consultation status",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "API is running",
      timestamp: new Date().toISOString(),
    });
  });
}
