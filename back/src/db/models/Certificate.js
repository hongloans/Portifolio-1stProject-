import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByCertificateId({ certificateId }) {
    const certificate = await CertificateModel.findOne({ id: certificateId });
    return certificate;
  }

  static async findByUserId({ user_id }) {
    const certificates = await CertificateModel.find({ user_id });
    return certificates;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
}

export { Certificate };
