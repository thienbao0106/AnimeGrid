const normalizeWord = (word: string) => {
  return `${word.charAt(0)}${word.slice(1, word.length).toLowerCase()}`;
};

export const convertVoiceActress = (voiceActors: VoiceActor[]) => {
  const value = 30;
  return voiceActors.slice(0, 3).map((voiceActor: VoiceActor) => {
    const { name, image, role } = voiceActor;
    return {
      value,
      name,
      role: `${normalizeWord(role)} Cast`,
      image,
    };
  });
};

export const convertStaff = (staffs: Staff[]) => {
  const FILTERED_ROLE = [
    "Original Creator",
    "Character Design",
    "Director",
    "Theme Song Performance (OP)",
    "Theme Song Performance (ED)",
  ];
  const values = [20, 10, 10, 20, 20];
  return staffs
    .filter((staff: Staff) => {
      return FILTERED_ROLE.find((role: string) => role === staff.role);
    })
    .map((staff: Staff, index: number) => {
      return {
        value: values[index],
        name: staff.name,
        role: staff.role,
      };
    });
};
