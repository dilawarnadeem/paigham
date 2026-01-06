import { NextApiRequest, NextApiResponse } from "next";
import { request, gql } from "graphql-request";

const WP_GRAPHQL_URI = "https://zamzamwelfaretrust.com/paighamtv/graphql";

interface CreateDonationLeadInput {
  title: string;
  contactNumber: string;
  email: string | null;
  city: string;
  purpose: string;
  donationAmount: number;
  personalMessage: string | null;
  paymentMethod: string;
  transactionId: string | null;
}

interface CreateDonationLeadResponse {
  createDonationLead: {
    success: boolean;
    message: string;
    donationLead?: {
      id: string;
      title: string;
      contactNumber: string;
      email: string;
      city: string;
      purpose: string;
      donationAmount: number;
      personalMessage: string;
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body as CreateDonationLeadInput;

    const mutation = gql`
      mutation CreateDonationLead($input: CreateDonationLeadInput!) {
        createDonationLead(input: $input) {
          success
          message
          donationLead {
            id
            title
            contactNumber
            email
            city
            purpose
            donationAmount
            personalMessage
          }
        }
      }
    `;

    const variables = {
      input: {
        title: formData.title,
        contactNumber: formData.contactNumber,
        email: formData.email || null,
        city: formData.city,
        purpose: formData.purpose,
        donationAmount: formData.donationAmount,
        personalMessage: formData.personalMessage || null,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId || null,
      },
    };

    try {
      const response = await request<CreateDonationLeadResponse>(
        WP_GRAPHQL_URI,
        mutation,
        variables
      );
      res.status(200).json({
        message: response.createDonationLead.message,
        success: response.createDonationLead.success,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to submit lead. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
