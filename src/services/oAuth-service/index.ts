import userRepository from "@/repositories/user-repository";

export async function findGitHubEnrollment(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  return userWithSameEmail;
}

const oAuthService = {
  findGitHubEnrollment
};

export default oAuthService;
